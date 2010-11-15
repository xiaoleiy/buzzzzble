(function() {
	if (!window['jQuery']) {
		throw Error("Need jQuery");
	}
	/*
	 * Constants BASE : Version 1 base url of google buzz api BUZZAPI_ACTIVITIES
	 */
	var _baseuri = 'https://www.googleapis.com/buzz/v1';
	var BUZZ_API = {
		BASE : _baseuri,
		ACTIVITIES : {
			BASE : _baseuri + '/activities',
			ME : {
				SELF : _baseuri + '/activities/@me/@self',
				PUBLIC : _baseuri + '/activities/@me/@public',
				CONSUMPTION : _baseuri + '/activities/@me/@consumption',
				LIKED : _baseuri + '/activities/@me/@liked'
			}
		}
	};
	window.Buzzzzble = window.Buzzzzble || {};
	/*
	 * Buzzzzble.DAO findMePublicActivites findMeSelfActivities
	 * findMeConsumptionActivities
	 * 
	 * makeItBuzzzzble
	 * 
	 */
	var DAO = {
		doAPIUrl : '/doAPI',
		core : jQuery,
		request : function(apiobj, funcs) {
			DAO.core.param(apiobj);
			DAO.core.ajax({
				url : DAO.doAPIUrl,
				type : 'POST',
				data : DAO.core.param(apiobj),
				dataType : 'json',
				success : function(returnObj, code) {
					if (funcs && funcs.success) {
						funcs.success(returnObj, code);
					}
				},
				error : function(xhr, code, errorThrown) {
					if (funcs && funcs.error) {
						funcs.error();
					} else {
						throw errorThrown;
					}
				}
			});
		},
		requestOpt : function(apiobj, retDataType, funcs){
			DAO.core.param(apiobj);
			DAO.core.ajax({
				url : DAO.doAPIUrl,
				type : 'POST',
				data : DAO.core.param(apiobj),
				dataType : retDataType,
				success : function(returnObj, code) {
					if (funcs && funcs.success) {
						funcs.success(returnObj, code);
					}
				},
				error : function(xhr, code, errorThrown) {
					if (funcs && funcs.error) {
						funcs.error();
					} else {
						throw errorThrown;
					}
				}
			});
		},
		findMePublicActivites : function(funcs) {
			var apiobj = {
				buzzapi_type : 'GET',
				buzzapi_alt : 'json',
				buzzapi_uri : BUZZ_API.ACTIVITIES.ME.PUBLIC
			};
			DAO.request(apiobj, funcs);
		},
		findMeSelfActivities : function(funcs) {
			var apiobj = {
				buzzapi_type : 'GET',
				buzzapi_alt : 'json',
				buzzapi_uri : BUZZ_API.ACTIVITIES.ME.SELF
			};
			DAO.request(apiobj, funcs);
		},
		findMeConsumptionActivities : function(funcs) {
			var apiobj = {
				buzzapi_type : 'GET',
				buzzapi_alt : 'json',
				buzzapi_max_results : 20,
				buzzapi_uri : BUZZ_API.ACTIVITIES.ME.CONSUMPTION
			};
			DAO.request(apiobj, funcs);
		},
		findCommentsByActivityId : function(activityId, funcs) {
			var apiobj = {
				buzzapi_type : 'GET',
				buzzapi_alt : 'json',
				buzzapi_uri : BUZZ_API.ACTIVITIES.ME.SELF + '/' + activityId
						+ '/@comments'
			};
			DAO.request(apiobj, funcs);
		},
		makeItComment : function(activityId, content, funcs) {
			var apiobj = {
				buzzapi_type : 'POST',
				buzzapi_uri : BUZZ_API.ACTIVITIES.ME.SELF + '/' + activityId
						+ '/@comments',
				buzzapi_alt : 'json',
				buzzapi_postData : '{"data":  {"content": "' + content + '"}}'
			};
			DAO.request(apiobj, funcs);
		},
		makeItBuzzzzble : function(content, funcs) {
			var apiobj = {
				buzzapi_type : 'POST',
				buzzapi_uri : BUZZ_API.ACTIVITIES.ME.SELF,
				buzzapi_alt : 'json',
				buzzapi_postData : '{"data": {"object": {"type": "note", "content": "'
						+ content + '"}}}'
			};
			DAO.request(apiobj, funcs);
		},
		likeIt : function(activityId, funcs) {
			var apiobj = {
				buzzapi_type : 'PUT',
				buzzapi_uri : BUZZ_API.ACTIVITIES.ME.LIKED + '/' + activityId
			};
			DAO.requestOpt(apiobj, 'xml', funcs);
		},
		unlikeIt : function(activityId, funcs){
			var apiobj = {
				buzzapi_type : 'DELETE',
				buzzapi_uri : BUZZ_API.ACTIVITIES.ME.LIKED + '/' + activityId
			};
			DAO.requestOpt(apiobj, '', funcs);
		},
		getLikers : function(href, funcs){
			var apiobj = {
				buzzapi_type : 'GET',
				buzzapi_uri : href
			};
			DAO.request(apiobj, funcs);
		}
	}
	Buzzzzble.DAO = DAO;
})();