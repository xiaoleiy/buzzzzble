package org.sunotaku.buzzzzble.utilitites;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import net.oauth.OAuth;
import net.oauth.OAuthMessage;
import net.oauth.OAuth.Parameter;

public final class FilterUtility {
	public static List<Parameter> GetQueryParameterList(
			HttpServletRequest request) {
		StringBuffer allParamsStr = new StringBuffer();
		for (String paramStr : Constants.QueryParameters.ALLPARAMETERS) {
			Object value = request.getParameter(paramStr);
			if (value != null) {
				// for max-results and max-liked
				// we need to replace the '_' to '-'
				allParamsStr.append(paramStr.split("buzzapi_")[1].replace('_',
						'-')
						+ "|" + String.valueOf(value) + "|");
			}
		}
		return OAuth.newList(allParamsStr.toString().split("\\|"));
	}

	public static String GetHttpRequestType(HttpServletRequest request) {
		String resultType = OAuthMessage.GET;
		Object type = request.getParameter(Constants.QueryParameters.HTTP_TYPE);
		if (type != null) {
			String temp = String.valueOf(type).toUpperCase();
			if (temp.equals("POST")) {
				resultType = OAuthMessage.POST;
			} else if (temp.equals("PUT")) {
				resultType = OAuthMessage.PUT;
			} else if (temp.equals("DELETE")) {
				resultType = OAuthMessage.DELETE;
			}
		}
		return resultType;
	}

	public static String GetBuzzURI(HttpServletRequest request) {
		Object uri = request.getParameter(Constants.QueryParameters.API_URI);
		return String.valueOf(uri == null ? "" : uri);
	}

	public static InputStream GetPostDataStream(HttpServletRequest request)
			throws UnsupportedEncodingException {
		String pData = request.getParameter(//
				Constants.QueryParameters.POST_DATA);
		if (pData != null) {
			return new ByteArrayInputStream(pData.getBytes(Charset
					.forName("UTF-8")));
		}
		return null;
	}
}
