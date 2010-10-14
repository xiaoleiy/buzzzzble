package org.sunotaku.buzzzzble;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.oauth.OAuthConsumer;
import net.oauth.example.consumer.webapp.CookieConsumer;

import org.sunotaku.buzzzzble.utilitites.Constants;

@SuppressWarnings("serial")
public class OauthAuthorizationServlet extends HttpServlet {
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {
		OAuthConsumer consumer = null;
		try {
			//
			// if get authorized, then return to index page.
			request.setAttribute("returnTo", Constants.MAIN);
			// get consumer and accessor
			CookieConsumer.getAccessor(request, response, CookieConsumer
					.getConsumer(Constants.SCOPE_NAME_FROM_PROPERTIES,
							getServletContext()));
			response.sendRedirect(Constants.MAIN);
		} catch (Exception e) {
			CookieConsumer.handleException(e, request, response, consumer);
		}
	}
}
