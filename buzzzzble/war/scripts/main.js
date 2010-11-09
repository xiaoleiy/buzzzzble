$(document).ready(function() {
	if (Buzzzzble && Buzzzzble.DAO) {
		// 
		var commentBtnTemplate = (function() {
			var btn = document.createElement('div');
			$(btn).addClass('commentReplytWrapper');

			var btnIcon = document.createElement('a');
			$(btnIcon).addClass('comment-btn').attr('title', 'Reply');
			$(btn).append(btnIcon);

			var btnRight = document.createElement('a');
			$(btnRight).addClass('comment-btn-right').attr('title', 'Reply');
			$(btn).append(btnRight).append('<div class="clear"></div>');

			return btn;
		})();
		//
		var commentReplyArea = (function() {
			var commentReply = document.createElement('li');
			$(commentReply).addClass('comment-reply-item');

			var commentReplyArea = document.createElement('textarea');
			$(commentReplyArea).addClass('comment-area');
			$(commentReply).append(commentReplyArea);

			var btnArea = document.createElement('p');
			$(btnArea).addClass('np');

			$(commentReply).append($(btnArea).addClass('btnWrapper'));

			var confirmBtn = document.createElement('a');
			$(confirmBtn).append('Reply it');
			$(btnArea).append(confirmBtn);

			var cancelBtn = document.createElement('a');
			$(cancelBtn).append('Cancel');
			$(btnArea).append(cancelBtn);
			return commentReply;
		})();

		// 
		var activityCommentShortCut = (function() {
			var shortCut = document.createElement('div');
			$(shortCut).addClass('activityCommentShortCut');

			var p = document.createElement('p');
			$(p).append('All Comments (<span class="commentNum">0</span>)');
			$(shortCut).append(p);

			return shortCut;
		})();
		/*
		 * //activityItemTemplate <li class="activityWrapper"> <div> <div
		 * class="actorAvatarWrapper"> <img width="40" height="40"
		 * class="avatar" src=""/><br class="clear"/> * </div> <div
		 * class="contentWrapper"> <p class="activityContent"><a
		 * class="actorName" href="">actorName</a>abcdefg</p> </div> <div
		 * class="clear"></div> </div> <ul class="commentsList"></ul> </li>
		 */
		var activityItemTemplate = (function() {
			var item = document.createElement('li');
			$(item).addClass('activityWrapper');

			var article = document.createElement('div');
			$(item).append(article);
			/*
			 * actorAvatarWrapperSection Part
			 */
			var actorAvatarWrapperSection = document.createElement('div');
			$(article).append(actorAvatarWrapperSection);

			var avatar = document.createElement('img');
			$(actorAvatarWrapperSection).addClass('actorAvatarWrapper').append(
					$(avatar).addClass('avatar').attr('width', 40).attr(
							'height', 40));

			$(actorAvatarWrapperSection).append('<div class="clear"></div>')

			var source = document.createElement('span');
			$(source).addClass('activity-source');

			var activityDate = document.createElement('span');
			$(activityDate).addClass('activity-date');

			/*
			 * contentWrapperSection Part
			 */
			var contentWrapperSection = document.createElement('div');
			$(article).append(contentWrapperSection);

			var content = document.createElement('p');
			$(contentWrapperSection).addClass('contentWrapper').append(
					$('<a></a>').addClass('actorName')).append(source).append(
					' -').append(activityDate).append(
					$(content).addClass('activityContent'))

			// add br.clear
			$(article).append('<div class="clear"></div>');

			// add comment status
			var commentStatus = $(activityCommentShortCut).clone();
			$(item).append(commentStatus);

			$(item).append('<ul class="commentsList"></ul>');

			return item;
		})();
		
		var commentItemTemplate = (function() {
			var commentItem = document.createElement('li');
			var actorAvatar = document.createElement('img');
			$(actorAvatar).attr( {
				'width' : 34,
				'height' : 34
			});
			var commentActorName = document.createElement('a');
			$(commentActorName).addClass('actorName');
			var avatarLink = document.createElement('a');
			$(avatarLink).addClass('avatarLink');
			var commentDate = document.createElement('span');
			$(commentDate).addClass('comment-date');

			var commentContent = document.createElement('p');
			$(commentContent).addClass('comment-content').append(
					commentActorName).append(commentDate);
			$(commentItem).append($(avatarLink).append(actorAvatar)).append(
					commentContent).append('<div class="clear"></div>');

			return commentItem;
		})();

		// photo template
		var photoListTemplate = (function() {
			var list = document.createElement('ul');
			$(list).addClass('photoList');
			return list;
		})();

		var photoItemTemplate = (function() {
			var li = document.createElement('li');
			$(li).addClass('photoItem');

			var link = document.createElement('a');
			$(li).append(link);

			var img = document.createElement('img');
			$(link).append(img);

			return li;
		})();
		var appendPhotoAttachment = function(jqPhotoListObj, photoObj) {
			jqPhotoListObj.append($(photoItemTemplate).clone()).find(
					'li.photoItem:last > a').attr( {
				'href' : photoObj.links.enclosure[0].href,
				'target' : '_blank',
				'data-imgWidth' : photoObj.links.enclosure[0].width,
				'data-imgHeight' : photoObj.links.enclosure[0].height,
				'data-type' : photoObj.links.enclosure[0].type
			}).find('img').attr( {
				'src' : photoObj.links.preview[0].href,
				'data-type' : photoObj.links.preview[0].type
			});
		};

		// get converted published date
		var getConvertedPublishedDate = function(publishedDate) {
			var date = new Date(publishedDate);			
			return date.toLocaleString();
		};
		var loadItemData = function(itemTarget, activity) {
			// set avatar
			$(itemTarget).find('img.avatar').attr( {
				src : activity.actor.thumbnailUrl,
				alt : activity.actor.name
			});
			// set actor profile url & name
			$(itemTarget).find('a.actorName').attr('href',
					activity.actor.profileUrl).append(activity.actor.name);
			// set activity title
			$(itemTarget).find('p.activityContent').append(
					activity.object.content);
			$(itemTarget).find('span.activity-source').append(
					' via ' + activity.source.title);
			$(itemTarget).find('span.activity-date').append(
					getConvertedPublishedDate(activity.published));
			//
			// load attachment
			if (activity.object.attachments) {
				var att = activity.object.attachments;
				for ( var i = 0; i < att.length; i++) {
					var attItem = att[i];
					switch (attItem.type) {
					case 'photo':
						appendPhotoAttachment($(itemTarget)
								.find('ul.photoList'), attItem);
						break;
					}
				}
			}
			// load comments
			loadCommentListData(itemTarget, activity);
		};

		var loadCommentListData = function(itemTarget, activity) {
			Buzzzzble.DAO.findCommentsByActivityId(activity.id, {
				success : function(obj, code) {

					if (obj.data.items && obj.data.items.length > 0) {
						$(itemTarget).find('span.commentNum').html(
								obj.data.items.length);

						// SET THE WAY TO DISPLAY
					var top, bottom;
					top = bottom = obj.data.items.length;
					if (bottom >= 5) {
						top = 1;
						bottom -= 2;
					}
					for ( var i = 0; i < obj.data.items.length; i++) {
						var dataObj = obj.data.items[i];
						var commentItem = $(commentItemTemplate).clone();

						// TOP <- HIDDEN -> BOTTOM
					if (i >= top && i < bottom) {
						$(commentItem).addClass('commentHidden');
					}
					// load comment data
					loadCommentData(commentItem, dataObj);
					commentItem.insertBefore($(itemTarget).find(
							'ul.commentsList > li:last'));
				}
				// ADD OPEN LINK
				// TODO : enhance this part
				if (top != bottom && top == 1) {
					var templink = document.createElement('a');
					var hiddenItemNum = obj.data.items.length - 3;
					$(templink).attr('href', '#').addClass('readAllComment')
							.html(hiddenItemNum + ' older comments &#187;');
					$(templink).insertAfter(
							$(itemTarget).find('ul.commentsList > li:first'));

					$(templink).click(
							function() {
								$(itemTarget).find('li.commentHidden')
										.removeClass('commentHidden');
								$(templink).remove();
								return false;
							});
				}
			} else { // comments length equals 0
				$(itemTarget).find('div.activityCommentShortCut').css(
						'display', 'none');
			}
		}
	}		);
		};
		var loadCommentData = function(itemTarget, comment) {
			// set actor name
			$(itemTarget).find('a.actorName').attr('href',
					comment.actor.profileUrl).append(comment.actor.name);
			// set comment content
			$(itemTarget).find('p.comment-content').append('<br/>').append(
					comment.content);
			// set actor avatar
			$(itemTarget).find('img').attr('src', comment.actor.thumbnailUrl);
			// set avatar link
			$(itemTarget).find('a.avatarLink').attr('href',
					comment.actor.profileUrl);
			// set time
			$(itemTarget).find('span.comment-date').append(
					getConvertedPublishedDate(comment.published));
		};

		/*
		 * 
		 */
		var appendActivity = function(activity) {
			var newItem = $(activityItemTemplate).clone();

			// photolist
			var photoList = $(photoListTemplate).clone();
			$(newItem).find('.contentWrapper').append(photoList);

			// add comment button
			var commentBtn = $(commentBtnTemplate).clone();
			$(newItem).append(commentBtn);

			// add comment reply area
			var commentReplyAreaBack = $(commentReplyArea).clone();
			$(commentReplyAreaBack).find('a').button();
			$(newItem).find('ul.commentsList').append(commentReplyAreaBack);

			var textarea = $(commentReplyAreaBack).find('textarea');

			// bind btn hover event
			$(newItem).hover(function() {
				commentBtn.addClass('commentReplytWrapper-show');
			}, function() {
				commentBtn.removeClass('commentReplytWrapper-show');
			});

			$(commentBtn).click(function() {
				commentBtn.removeClass('commentReplytWrapper-show');
				// display the comment reply area
					$(commentReplyAreaBack).css('display', 'block');
					// get textarea
					textarea.focus();
				});

			var authors = $(commentReplyAreaBack).find('a');
			// OK BUTTON
			var sending = false;
			$(authors[0]).click(function() {
				var textVal = textarea.val();
				if (textVal.length && !sending) {
					// SET THE STATUS
					sending = true;

					// CHANGE THE TEXT OF AUTHOR
					$(authors[0]).html('Sending...');
					$(textarea).attr('enable', false);

					// DO THE REQUEST
					Buzzzzble.DAO.makeItComment(activity.id, textVal, {
						/*
						 * CREATE A NEW COMMENT FOR A ACTIVITY
						 */
						success : function(comment) {
							// RESET THE TEXT OF AUTHOR
							$(authors[0]).html('Reply it');
							$(textarea).attr('enable', true);

							var newComment = $(commentItemTemplate).clone();
							loadCommentData(newComment, comment.data);
							/*
							 * if create successfully, animation will be
							 * occurred
							 */
							newComment.insertBefore(
									newItem.find('ul.commentsList > li:last'))
									.animate( {
										backgroundColor : '#e8ffbb'
									}, 500).animate( {
										backgroundColor : '#fff'
									});
							/*
							 * CLEAR VALUE OF TEXTAREA
							 */
							$(textarea).val('');
							textarea.focus();
							// set the status sending false
							sending = false;
						}
					});
				}
			});
			// 
			$(authors[1]).click(function() {
				// hide comment reply area
					$(commentReplyAreaBack).css('display', 'none');
				});

			loadItemData(newItem, activity);
			$('#activitiesList').append(newItem);
		};
		var initialize = function() {
			Buzzzzble.DAO.findMeConsumptionActivities( {
				success : function(obj, code) {
					if (obj) {
						var itemsLength = obj.data.items.length;
						for ( var i = 0; i < itemsLength; i++) {
							appendActivity(obj.data.items[i]);
						}
					}
				}
			});
		};
		var refresh = function() {
			$('#activitiesList').find('li').remove();
			initialize();
		};
		/*
		 * initialize the latest 20 activities
		 */
		initialize();
		/*
		 * bind post button
		 */
		$('#activityUpdateBtn').click(function() {
			Buzzzzble.DAO.makeItBuzzzzble($('#activityContent').val(), {
				success : function(obj, code) {
					$('#activityContent').val('');
					refresh();
				}
			});
		});

		$('#refreshBtn').click(function() {
			refresh();
		});

		$('#activityUpdateBtn,#refreshBtn').button();
		$('#activityContent').textbox();
	}
});