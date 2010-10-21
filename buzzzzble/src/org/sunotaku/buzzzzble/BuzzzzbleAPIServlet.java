package org.sunotaku.buzzzzble;

import static net.oauth.OAuth.HMAC_SHA1;
import static net.oauth.OAuth.OAUTH_SIGNATURE_METHOD;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.oauth.OAuthAccessor;
import net.oauth.OAuthConsumer;
import net.oauth.OAuthMessage;
import net.oauth.ParameterStyle;
import net.oauth.client.OAuthResponseMessage;
import net.oauth.example.consumer.webapp.CookieConsumer;

import org.sunotaku.buzzzzble.utilitites.Constants;
import org.sunotaku.buzzzzble.utilitites.FilterUtility;

@SuppressWarnings("serial")
public class BuzzzzbleAPIServlet extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {
		OAuthConsumer consumer = null;
		try {

			// String a = FilterUtility.GetHttpRequestType(request);
			// String b = FilterUtility.GetBuzzURI(request);
			// List c = FilterUtility.GetQueryParameterList(request);

			// get consumer and accessor
			consumer = CookieConsumer.getConsumer(
					Constants.SCOPE_NAME_FROM_PROPERTIES, getServletContext());
			
			OAuthAccessor accessor = CookieConsumer.getAccessor(request,
					response, consumer);

			accessor.consumer.setProperty(OAUTH_SIGNATURE_METHOD, HMAC_SHA1);

			OAuthMessage message = accessor.newRequestMessage( //
					FilterUtility.GetHttpRequestType(request), //
					FilterUtility.GetBuzzURI(request),//
					FilterUtility.GetQueryParameterList(request), //
					FilterUtility.GetPostDataStream(request));
			
			OAuthResponseMessage result = (OAuthResponseMessage) CookieConsumer.CLIENT
					.invoke(message, ParameterStyle.AUTHORIZATION_HEADER);

			//
			// copy to browser
			CookieConsumer.copyResponse(result, response);
		} catch (Exception e) {
			CookieConsumer.handleException(e, request, response, consumer);
		}
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {
		this.doGet(request, response);
	}
}
