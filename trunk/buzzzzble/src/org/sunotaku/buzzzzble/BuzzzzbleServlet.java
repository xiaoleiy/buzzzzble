package org.sunotaku.buzzzzble;

import static net.oauth.OAuth.HMAC_SHA1;
import static net.oauth.OAuth.OAUTH_SIGNATURE_METHOD;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.oauth.OAuthAccessor;
import net.oauth.OAuthConsumer;
import net.oauth.OAuthMessage;
import net.oauth.ParameterStyle;
import net.oauth.example.consumer.webapp.CookieConsumer;

@SuppressWarnings("serial")
public class BuzzzzbleServlet extends HttpServlet {
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {
		OAuthConsumer consumer = null;
		try {
			consumer = CookieConsumer.getConsumer("googleBuzz",
					getServletContext());
			OAuthAccessor accessor = CookieConsumer.getAccessor(request,
					response, consumer);

			accessor.consumer.setProperty(OAUTH_SIGNATURE_METHOD, HMAC_SHA1);

			OAuthMessage message = accessor
					.newRequestMessage(
							OAuthMessage.GET,
							"https://www.googleapis.com/buzz/v1/activities/@me/@public",
							null);
			OAuthMessage result = CookieConsumer.CLIENT.invoke(message,
					ParameterStyle.AUTHORIZATION_HEADER);

			//
			// copy to browser
			CookieConsumer.copyResponse(result, response);
		} catch (Exception e) {
			CookieConsumer.handleException(e, request, response, consumer);
		}
	}
}
