package org.sunotaku.buzzzzble.utilitites;

public final class Constants {
	public static final String SCOPE_NAME_FROM_PROPERTIES = "googleBuzz";
	public static final String INDEX = "/index.html";
	public static final String MAIN = "/main.html";
	public static final String GET_OAUTH_AUTHORIZATION_SUCCESS = "/index.html";
	public static final String GET_OAUTH_AUTHORIZATION_FAILURE = "";

	// FROM APIs
	public final static class CommonVariables {
		public static final String USERID = "userId";
		public static final String ACTIVITYID = "activityId";
		public static final String COMMENTID = "commentId";
	}

	public final static class QueryParameters {
		// HTTP TYPE & URI
		public static final String HTTP_TYPE = "buzzapi_type";
		public static final String API_URI = "buzzapi_uri";

		// belong to ALLPARAMETERS
		public static final String ALT = "buzzapi_alt";
		public static final String PRETTYPRINT = "buzzapi_prettyprint";
		public static final String CALLBACK = "buzzapi_callback";
		public static final String PREVIEW = "buzzapi_preview";
		public static final String C = "buzzapi_c";
		public static final String MAXRESULTS = "buzzapi_max_results";
		public static final String MAXLIKED = "buzzapi_max_liked";
		public static final String Q = "buzzapi_q";
		public static final String LAT = "buzzapi_lat";
		public static final String LON = "buzzapi_lon";
		public static final String RADIUS = "buzzapi_radius";
		public static final String BBOX = "buzzapi_bbox";
		public static final String PID = "buzzapi_pid";

		// POST || PUT DATA
		public static final String POST_DATA = "buzzapi_postData";
		public static final String[] ALLPARAMETERS = { ALT, PRETTYPRINT,
				CALLBACK, PREVIEW, C, MAXRESULTS, MAXLIKED, Q, LAT, LON,
				RADIUS, BBOX, PID };
	}
}
