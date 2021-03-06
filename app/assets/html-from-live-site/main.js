"use strict";
! function(e) {
    e(document).ready(function() {
        window.cd = {}, e(".menu-btn").on("click", function(e) {
            e.preventDefault()
        });
        var a = e("body").data("cons-id") ? e("body").data("cons-id") : null;
        cd.evID = e("body").data("fr-id") ? e("body").data("fr-id") : null, cd.getURLParameter = function(e, a) {
            return (RegExp(a + "=(.+?)(&|$)").exec(e) || [, null])[1]
        };
        var t = document.body.scrollHeight,
            s = e(window).width();
        t > 1080 && s > 992 && e("#back_to_top").removeClass("d-md-none"), s > 991 && e("ul.navbar-nav li.dropdown").hover(function() {
            e(this).find(".dropdown-menu").stop(!0, !0).fadeIn(150)
        }, function() {
            e(this).find(".dropdown-menu").stop(!0, !0).fadeOut(150)
        });
        var n = "",
            i = [];
        null == luminateExtend.global.auth.token && luminateExtend.api.getAuth({
            callback: e.noop,
            useCache: !0,
            useHTTPS: !0
        });
        var r = {
            success: function() {
                cd.getUser()
            },
            error: function() {}
        };
        cd.loginTest = function() {
            luminateExtend.api({
                api: "cons",
                callback: r,
                data: "method=loginTest"
            })
        }, cd.loginTest(), cd.getUser = function() {
            luminateExtend.api({
                api: "cons",
                data: "method=getUser",
                requiresAuth: !0,
                useHTTPS: !0,
                requestType: "POST",
                callback: function(t) {
                    if (t.getConsResponse) {
                        a = t.getConsResponse.cons_id;
                        var s = e("body").is(".pg_ridepc") ? "https://act.alz.org/site/SPageServer?pagename=ride_homepage" : window.location.href,
                            r = "http://act.alz.org/site/UserLogin?logout=1&pw_id=11827&NEXTURL=" + encodeURIComponent(s);
                        e(".js__log-out-link").attr("href", r), cd.getRegisteredTeamraisers()
                    }
                    t.getConsResponse && t.getConsResponse.name.first && (e(".js__first-name").text(t.getConsResponse.name.first), e(".js__logged-out").hide(), e(".js__logged-in").show(), e.inArray(n, i))
                }
            })
        }, cd.getTeamraiserInfo = function(t) {
            e.ajax({
                url: luminateExtend.global.path.secure + "SPageServer?pagename=reus_ride_2018_getPartInfo&pgwrap=n&fr_id=" + t + "&cons_id=" + a,
                type: "post",
                dataType: "text",
                cache: "false",
                success: function(a) {
                    var s = a.split("-")[0],
                        n = a.split("-")[1],
                        i = ".slidebar-content";
                    e("p#" + t).length > 0 && (i = "p#" + t + " + div"), e(i + " .daysToEvent").html(parseInt(s, 10) > -1 ? s : "0"), e(i + " .dollarsRaised").html("" != n ? n : "$0")
                }
            })
        }, cd.getRegisteredTeamraisers = function() {
            var a = {
                success: function(a) {
                    if (a.getRegisteredTeamraisersResponse && a.getRegisteredTeamraisersResponse.teamraiser) {
                        var t = luminateExtend.utils.ensureArray(a.getRegisteredTeamraisersResponse.teamraiser),
                            s = new Date;
                        if (t.length > 1) {
                            var n = 0,
                                r = !1,
                                o = "";
                            if (e(t).each(function(a) {
                                    if ("1" === this.status || "2" === this.status || "3" === this.status) {
                                        n += 1, e(".js__has-rides").show();
                                        var t = this.id,
                                            l = this.name,
                                            c = this.city + ", " + this.state,
                                            d = this.teamPageUrl ? this.teamPageUrl : null,
                                            p = new Date(this.event_date),
                                            _ = Math.floor((p - s) / 864e5) + 1;
                                        _ = _ > 1 ? '<span class="h5">' + String(_) + " DAYS</span> until your ride" : 1 === _ ? '<span class="h5">' + String(_) + " DAY</span> until your ride" : "", i.push(t), o += '<div class="card bg-transparent"><div class="card-header" id="heading' + a + '"><a href="#" class="text-left text-white collapsed js__side-eventname" data-toggle="collapse" data-target="#collapse' + a + '" aria-expanded="false" aria-controls="collapse' + a + '"><i class="fas fa-plus-square text-secondary"></i><i class="fas fa-minus-square text-secondary"></i><span class="h3 text-underline">' + l + "</span>" + c + '</a></div><div id="collapse' + a + '" class="collapse" aria-labelledby="heading' + a + '" data-parent="#eventsAccordion"><div class="card-body"><hr><ul class="nav flex-column"><li class="nav-item pushy-link"><a class="nav-link js__side-dashboard" href="SPageServer?pagename=ridepc&pc2_page=pc-dashboard&fr_id=' + t + '">Dashboard</a></li><li class="nav-item pushy-link"><a class="nav-link js__side-mypage" href="SPageServer?pagename=ridepc&pc2_page=pc-edit-page&fr_id=' + t + '">My Page</a></li>' + (d ? '<li class="nav-item pushy-link"><a class="nav-link js__side-myteam" href="' + d + '">My Team</a></li>' : "") + '<li class="nav-item pushy-link"><a class="nav-link js__side-social" href="SPageServer?pagename=ridepc&pc2_page=pc-social&fr_id=' + t + '">Social</a></li><li class="nav-item pushy-link"><a class="nav-link js__side-email" href="SPageServer?pagename=ridepc&pc2_page=pc-email&fr_id=' + t + '">Email</a></li><li class="nav-item pushy-link"><a class="nav-link js__side-progress" href="SPageServer?pagename=ridepc&pc2_page=pc-donors&fr_id=' + t + '">Progress</a></li><li class="nav-item pushy-link"><a class="nav-link js__side-resources" href="SPageServer?pagename=ridepc&pc2_page=resources&fr_id=' + t + '">Resources</a></li><li class="nav-item pushy-link"><a class="nav-link js__side-community" href="http://alzride.smallworldlabs.com/dashboard" target="_blank">Community</a></li><li class="nav-item pushy-link"><a class="nav-link js__side-notifications" href="SPageServer?pagename=ridepc&pc2_page=pc-notifications&fr_id=' + t + '">Notifications</a></li></ul></div></div></div><hr></div>'
                                    } else r = !0
                                }), !0 === r) e(".js__has-events").attr("id", "eventsAccordion").wrapInner("<div class='multiple-events'></div>"), e(".multiple-events").append(o);
                            else if (n > 1) {
                                c = "TR?fr_id=" + (l = i[0]) + "&pg=entry";
                                e(".js__has-events").attr("id", "eventsAccordion").wrapInner("<div class='multiple-events'></div>"), e(".multiple-events").append(o)
                            } else {
                                var l = i[0],
                                    c = "TR?fr_id=" + l + "&pg=entry";
                                e(".js__has-events").addClass("single-event").append(o), e("#collapse1").addClass("show"), e("#heading1 .fas").hide(), e(".js__side-eventname").removeClass("collapsed").removeAttr("data-toggle").attr("href", c)
                            }
                        } else if (1 == t.length && "0" !== t[0].status && "4" !== t[0].status && "8" !== t[0].status) {
                            e(".js__has-rides").show();
                            var d = t[0].id,
                                p = t[0].name,
                                _ = t[0].city + ", " + t[0].state,
                                m = t[0].teamPageUrl ? t[0].teamPageUrl : null,
                                u = new Date(t[0].event_date),
                                h = Math.floor((u - s) / 864e5) + 1;
                            h = h > 1 ? '<span class="h5">' + String(h) + " DAYS</span> until your ride" : 1 === h ? '<span class="h5">' + String(h) + " DAY</span> until your ride" : "", i.push(d), e(".js__has-events").addClass("single-event").html('<div class="card bg-transparent"><div class="card-header text-left text-white"><a class="js__side-eventname" href="TR?page=entry&fr_id=' + d + '"><span class="h3">' + p + "</span></a>" + _ + '</div><div class="card-body"><hr><ul class="nav flex-column"><li class="nav-item pushy-link"><a class="nav-link js__side-dashboard" href="SPageServer?pagename=ridepc&pc2_page=pc-dashboard&fr_id=' + d + '">Dashboard</a></li><li class="nav-item pushy-link"><a class="nav-link js__side-mypage" href="SPageServer?pagename=ridepc&pc2_page=pc-edit-page&fr_id=' + d + '">My Page</a></li>' + (m ? '<li class="nav-item pushy-link"><a class="nav-link js__side-myteam" href="' + m + '">My Team</a></li>' : "") + '<li class="nav-item pushy-link"><a class="nav-link js__side-social" href="SPageServer?pagename=ridepc&pc2_page=pc-social&fr_id=' + d + '">Social</a></li><li class="nav-item pushy-link"><a class="nav-link js__side-email" href="SPageServer?pagename=ridepc&pc2_page=pc-email&fr_id=' + d + '">Email</a></li><li class="nav-item pushy-link"><a class="nav-link js__side-progress" href="SPageServer?pagename=ridepc&pc2_page=pc-donors&fr_id=' + d + '">Progress</a></li><li class="nav-item pushy-link"><a class="nav-link js__side-resources" href="SPageServer?pagename=ridepc&pc2_page=resources&fr_id=' + d + '">Resources</a></li><li class="nav-item pushy-link"><a class="nav-link js__side-community" href="http://alzride.smallworldlabs.com/dashboard" target="_blank">Community</a></li><li class="nav-item pushy-link"><a class="nav-link js__side-notifications" href="SPageServer?pagename=ridepc&pc2_page=pc-notifications&fr_id=' + d + '">Notifications</a></li></ul></div></div><hr></div>')
                        } else e(".js__has-events").replaceWith('<p style="color: #fff">You are not currently registered for a Ride to End ALZ.</p><p>' + (null === cd.evID ? '<a class="btn btn-block btn-secondary pushy-link" href="#" role="button" data-toggle="modal" data-target="#registerModal">Register now</a>' : '<a class="btn btn-block btn-secondary" href="TRR/?pg=utype&fr_id=' + cd.evID + '">Register now</a>') + "</p>");
                        e(".js__has-events").length > 0 && (e(".js__side-eventname").on("click", function(e) {
                            ga("send", "event", "top navigation", "click", "nav-utility-slide-greeting")
                        }), e(".js__side-dashboard").on("click", function(e) {
                            ga("send", "event", "top navigation", "click", "nav-utility-slide-dashboard")
                        }), e(".js__side-mypage").on("click", function(e) {
                            ga("send", "event", "top navigation", "click", "nav-utility-slide-my-page")
                        }), e(".js__side-myteam").on("click", function(e) {
                            ga("send", "event", "top navigation", "click", "nav-utility-slide-team-page")
                        }), e(".js__side-social").on("click", function(e) {
                            ga("send", "event", "top navigation", "click", "nav-utility-slide-social")
                        }), e(".js__side-email").on("click", function(e) {
                            ga("send", "event", "top navigation", "click", "nav-utility-slide-email")
                        }), e(".js__side-resources").on("click", function(e) {
                            ga("send", "event", "top navigation", "click", "nav-utility-slide-resources")
                        }), e(".js__side-community").on("click", function(e) {
                            ga("send", "event", "top navigation", "click", "nav-utility-slide-community")
                        }), e(".js__side-notifications").on("click", function(e) {
                            ga("send", "event", "top navigation", "click", "nav-utility-slide-notifications")
                        }))
                    }
                },
                error: function() {
                    e(".js__has-events").replaceWith('<p style="color: #fff">You are not currently registered for a Ride to End ALZ.</p><p>' + (null === cd.evID ? '<a class="btn btn-block btn-secondary pushy-link" href="#" role="button" data-toggle="modal" data-target="#registerModal">Register now</a>' : '<a class="btn btn-block btn-secondary" href="TRR/pg=utype&fr_id=' + cd.evID + '">Register now</a>') + "</p>")
                }
            };
            luminateExtend.api({
                api: "teamraiser",
                data: "method=getRegisteredTeamraisers&event_type=Ride%202019",
                useHTTPS: !0,
                requestType: "POST",
                callback: a
            })
        }, e(function() {
            n = e("#session_trID").val(), luminateExtend.api.bind()
        }), cd.consLogin = function(a, t, s, n) {
            luminateExtend.api({
                api: "cons",
                requestType: "POST",
                data: "method=login&user_name=" + a + "&password=" + t + "&remember_me=" + n + "&source=" + (void 0 !== cd.trLoginSourceCode ? cd.trLoginSourceCode : "") + "&sub_source=" + (void 0 !== cd.trLoginSubSourceCode ? cd.trLoginSubSourceCode : "") + "&send_user_name=true",
                useHTTPS: !0,
                requiresAuth: !0,
                callback: {
                    success: function(a) {
                        "sideMenu" === s ? (e(".js__side-login-form").fadeOut("slow"), setTimeout(cd.getUser(), 100)) : "trRegistration" === s && (cd.logInteraction(cd.trLoginInteractionID, cd.evID), e("main").data("join-team-id") ? window.location = luminateExtend.global.path.secure + "TRR/?pg=ptype&fr_id=" + cd.evID + "&skip_login_page=true&fr_tjoin=" + e("main").data("join-team-id") + "&s_regType=joinTeam" : window.location = window.location.href + "&s_regType=")
                    },
                    error: function(a) {
                        "22" === a.errorResponse.code ? e(".js__login-error-message").html("Oops! You entered an invalid email address.") : "202" === a.errorResponse.code ? e(".js__login-error-message").html("You have entered an invalid username or password. Please re-enter your credentials below.") : e(".js__login-error-message").html(a.errorResponse.message), e(".js__login-error-container").show()
                    }
                }
            })
        }, cd.consRetrieveLogin = function(a, t) {
            luminateExtend.api({
                api: "cons",
                requestType: "POST",
                data: "method=login&send_user_name=true&email=" + a,
                useHTTPS: !0,
                requiresAuth: !0,
                callback: {
                    success: function(s) {
                        !0 === t && (e(".js__retrieve-login-container, .js__reg-retrieve-login-container").hide(), e(".js__side-login-container, .js__reg-login-container").show(), e(".js__retrieve-login-success-message").html("A password reset has been sent to " + a + "."), e(".js__login-success-container, .js__retrieve-login-success-container").show())
                    },
                    error: function(a) {
                        !0 === t && (e(".js__retrieve-login-error-message").html(a.errorResponse.message), e(".js__retrieve-login-error-container").show())
                    }
                }
            })
        };
        var o = {
            successClass: "is-valid",
            errorClass: "is-invalid",
            classHandler: function(e) {
                return e.$element.closest(".field-required")
            }
        };
        if (e(".js__side-login-form").parsley(o), cd.resetValidation = function() {
                e(".js__side-login-form").parsley().reset()
            }, e(".js__side-login-form").on("submit", function(a) {
                a.preventDefault();
                var t = e(this);
                if (t.parsley().validate(), t.parsley().isValid()) {
                    var s = e("#loginUsername").val(),
                        n = e("#loginPassword").val(),
                        i = e("#sideRememberMe").is(":checked");
                    cd.consLogin(s, n, "sideMenu", i), cd.resetValidation()
                } else e(".js__login-error-message").html("Please fix the errors below."), e(".js__login-error-container").show()
            }), e(".js__retrieve-login-form").on("submit", function(a) {
                a.preventDefault();
                var t = e(this);
                if (t.parsley().validate(), t.parsley().isValid()) {
                    var s = e("#retrieveLoginEmail").val();
                    cd.consRetrieveLogin(s, !0), cd.resetValidation()
                } else e(".js__retrieve-login-error-message").html("Please fix the errors below."), e(".js__retrieve-login-error-container").show()
            }), e(".js__show-retrieve-login").on("click", function(a) {
                a.preventDefault(), cd.resetValidation(), e(".js__side-login-container, .js__reg-login-container").hide(), e(".js__retrieve-login-container, .js__reg-retrieve-login-container").show()
            }), e(".js__show-login").on("click", function(a) {
                a.preventDefault(), cd.resetValidation(), e(".js__retrieve-login-container, .js__reg-retrieve-login-container").hide(), e(".js__side-login-container, .js__reg-login-container").show()
            }), cd.getEvents = function(a) {
                e(".js__loading").show(), luminateExtend.api({
                    api: "teamraiser",
                    data: "method=getTeamraisersByInfo&name=" + a + "&event_type=Ride%202019&response_format=json&list_page_size=499&list_page_offset=0&list_sort_column=event_date&list_ascending=true",
                    callback: {
                        success: function(a) {
                            e(".js__loading").hide(), a.getTeamraisersResponse.totalNumberResults > "0" && luminateExtend.utils.ensureArray(a.getTeamraisersResponse.teamraiser).map(function(a, t) {
                                var s = a.id,
                                    n = (a.name, luminateExtend.utils.simpleDateFormat(a.event_date, "EEEE, MMMM d, yyyy")),
                                    i = a.city,
                                    r = a.state,
                                    o = a.mail_state,
                                    l = a.location_name,
                                    c = a.public_event_type_name,
                                    d = a.greeting_url,
                                    p = "TRR/?pg=utype&fr_id=" + s + "&s_regType=",
                                    _ = a.accepting_registrations,
                                    m = '<li class="event-detail row mb-4 fadein"' + (t < 3 ? "" : "hidden") + '><div class="col-md-6"><p><a class="js__event-name" href="' + d + '" class="d-block font-weight-bold"><span class="city">' + i + '</span>, <span class="fullstate">' + o + '</span></a><span class="state-abbr d-none">' + r + '</span><span class="eventtype d-block">' + c + '</span><span class="event-location d-block">' + l + '</span><span class="event-date d-block">' + n + '</span></p></div><div class="col-md-3 col-6"><a href="' + d + '" class="btuttonbtn-outline-dark btn-block btn-lg js__event-details">Details</a></div><div class="col-md-3 col-6">' + ("true" === _ ? '<a href="' + p + '" class="button btn-primary btn-block btn-lg js__event-register">Register</a>' : '<span class="d-block text-center">Registration is closed<br>but <a class="scroll-link" href="#fundraiserSearch">you can still donate</a></span>') + "</div></li>";
                                e(".js__event-search-results").append(m)
                            })
                        },
                        error: function(a) {
                            e(".js__loading").hide()
                        }
                    }
                })
            }, cd.getParticipants = function(a, t, s, n) {
                a = encodeURIComponent(a), t = encodeURIComponent(t), e(".js__loading").show(), luminateExtend.api({
                    api: "teamraiser",
                    data: "method=getParticipants&first_name=" + (void 0 !== a ? a : "") + "&last_name=" + (void 0 !== t ? t : "") + (!0 === n ? "&event_type=Ride%202019" : "&fr_id=" + cd.evID) + "&list_page_size=499&list_page_offset=0&response_format=json&list_sort_column=first_name&list_ascending=true",
                    callback: {
                        success: function(a) {
                            if (e(".js__loading").hide(), "0" === a.getParticipantsResponse.totalNumberResults) e(".js__error-participant-search").text("Sorry. Your search did not return any results.").show();
                            else {
                                var t = luminateExtend.utils.ensureArray(a.getParticipantsResponse.participant);
                                e(t).each(function(a, t) {
                                    e(".js__search-results-container").append('<div class="row pb-4"><div class="col-xs-12 col-sm-8 search-result-details search-result-details"><p><strong><a href="' + t.personalPageUrl + '">' + t.name.first + " " + t.name.last + "</a></strong><br>" + t.eventName + "<br>" + (null !== t.teamName ? t.teamName + "<br>" : "") + '</p></div><div class="col-xs-12 col-sm-4 text-center">' + (null != t.donationUrl ? '<a class="button btn-primary btn-block" href="' + t.donationUrl + '">Donate Now</a>' : "<small>Donations Closed</small>") + ("donate" !== s ? '<a class="button btn-outline-dark btn-block" href="' + t.personalPageUrl + '">Visit Personal Page</a>' : "") + "</div></div>")
                                }), e(".js__search-tabs-container").hide(), e(".js__refine-search-container").show(), e(".js__search-results-container").slideDown()
                            }
                        },
                        error: function(a) {
                            e(".js__loading").hide(), "2664" === a.errorResponse.code ? e(".js__error-participant-search").text("You must enter at least 3 characters to search by participant first and last name.").show() : e(".js__error-participant-search").text(a.errorResponse.message).show()
                        }
                    }
                })
            }, cd.getTeams = function(a, t, s, n, i, r) {
                e(".js__loading").show(), a = encodeURIComponent(a), luminateExtend.api({
                    api: "teamraiser",
                    data: "method=getTeamsByInfo&team_name=" + a + (!0 === s ? "&event_type=Ride%202019" : "&fr_id=" + cd.evID) + (n ? "&first_name=" + n : "") + (i ? "&last_name=" + i : "") + (r ? "&team_company_id=" + r : "") + "&list_page_size=499&list_page_offset=0&response_format=json&list_sort_column=name&list_ascending=true",
                    callback: {
                        success: function(a) {
                            if (e(".js__loading").hide(), "0" === a.getTeamSearchByInfoResponse.totalNumberResults) e(".js__error-team-search").text("Sorry. Your search did not return any results.").show();
                            else {
                                var s = luminateExtend.utils.ensureArray(a.getTeamSearchByInfoResponse.team);
                                "registration" === t ? e(s).each(function(a, t) {
                                    t.teamDonateURL;
                                    e(".js__search-results-container").append('<div class="row"><div class="col-xs-12 col-sm-9 search-result-details"><div class="team-name"><a href="' + t.teamPageURL + '" >' + t.name + '</a></div><div class="captain-name">Team Captain: ' + t.captainFirstName + " " + t.captainLastName + "</div>" + (void 0 !== t.companyName ? '<div class="team-company-name">' + t.companyName + "</div>" : "") + '</div><div class="col-xs-12 col-sm-3 d-flex align-items-center"><a class="button btn-block btn-secondary" href="' + t.joinTeamURL + "&skip_login_page=true&s_joinTeamID=" + t.id + "&s_captainConsId=" + t.captainConsId + '">JOIN</a></div></div>'), e(".js__search-tabs-container").hide(), e(".js__refine-search-container").show(), e(".js__search-results-container").slideDown()
                                }) : e(s).each(function(a, t) {
                                    t.teamDonateURL;
                                    e(".js__search-results-container").append('<div class="row pb-4"><div class="col-xs-12 col-sm-8 search-result-details"><p><strong><a href="' + t.teamPageURL + '">' + t.name + "</a></strong><br>" + t.eventName + "<br>Team Captain: " + t.captainFirstName + " " + t.captainLastName + "<br>" + (void 0 !== t.companyName ? t.companyName + "<br>" : "") + '<a href="' + t.teamPageURL + '">Visit Team Page</a></p></div><div class="col-xs-12 col-sm-4"><a class="button btn-outline-dark btn-block" href="' + t.joinTeamURL + "&s_captainConsId=" + t.captainConsId + "&s_joinTeamID=" + t.id + '">Join Team</a><a class="button btn-primary btn-block" href="' + t.teamPageURL + '">Visit Team Page</a></div></div>'), e(".js__search-tabs-container").hide(), e(".js__refine-search-container").show(), e(".js__search-results-container").slideDown()
                                })
                            }
                        },
                        error: function(a) {
                            e(".js__loading").hide(), e(".js__error-team-search").text(a.errorResponse.message).show()
                        }
                    }
                })
            }, cd.getCompanies = function(a, t) {
                e(".js__loading").show(), a = encodeURIComponent(a), luminateExtend.api({
                    api: "teamraiser",
                    data: "method=getCompaniesByInfo&company_name=" + a + (!0 === t ? "&event_type=Ride%202019" : "&fr_id=" + cd.evID) + "&event_type=Ride%202019&list_page_size=499&list_page_offset=0&include_cross_event=true&response_format=json&list_sort_column=company_name&list_ascending=true",
                    callback: {
                        success: function(a) {
                            if (e(".js__loading").hide(), "0" === a.getCompaniesResponse.totalNumberResults) e(".js__error-company-search").text("Sorry. Your search did not return any results.").show();
                            else {
                                var t = luminateExtend.utils.ensureArray(a.getCompaniesResponse.company);
                                e(t).each(function(a, t) {
                                    e(".js__search-results-container").append('<div class="row pb-4"><div class="col-xs-12 col-md-9 col-sm-8 search-result-details search-result-details"><p><strong>' + t.companyName + '</strong></p></div><div class="col-xs-12 col-md-3 col-sm-4"><a class="button btn-primary btn-block" href="' + t.companyURL + '">Visit Page</a></div></div>'), e(".js__search-tabs-container").hide(), e(".js__refine-search-container").show(), e(".js__search-results-container").slideDown()
                                })
                            }
                        },
                        error: function(a) {
                            e(".js__loading").hide(), "2664" === a.errorResponse.code ? e(".js__error-company-search").text("You must enter at least 3 characters to search by company name.").show() : e(".js__error-company-search").text(a.errorResponse.message).show()
                        }
                    }
                })
            }, e(".js__redirect-participant-search-form").on("submit", function(a) {
                a.preventDefault();
                var t = e("#participantFirstName").val(),
                    s = e("#participantLastName").val();
                window.location.href = "https://act.alz.org/site/SPageServer/?pagename=ride_search&search_for=participant&search_type=general&first_name=" + t + "&last_name=" + s
            }), e(".js__redirect-team-search-form").on("submit", function(a) {
                a.preventDefault();
                var t = e("#teamName").val();
                window.location.href = "https://act.alz.org/site/SPageServer/?pagename=ride_search&search_for=team&search_type=general&team_name=" + t
            }), e(".js__redirect-company-search-form").on("submit", function(a) {
                a.preventDefault();
                var t = e("#companyName").val();
                window.location.href = "https://act.alz.org/site/SPageServer/?pagename=ride_search&search_for=company&search_type=general&company_name=" + t
            }), cd.getTeamMembers = function(a) {
                e(".js__loading").show(), luminateExtend.api({
                    api: "teamraiser",
                    data: "method=getTeamMembers&fr_id=" + cd.evID + "&team_id=" + a + "&list_page_size=499&list_page_offset=0&response_format=json",
                    callback: {
                        success: function(a) {
                            e(".js__loading").hide();
                            var t = luminateExtend.utils.ensureArray(a.getTeamMembersResponse.member);
                            e(t).each(function(a, t) {
                                e(".js__roster-results-container").append('<div class="row py-2 teammate-details"><div class="col-9 col-sm-8"><span class="teammate-name d-block"><a href="' + t.personalPageUrl + '" class="text-primary">' + (void 0 !== t.name.first ? t.name.first : "") + " " + (void 0 !== t.name.last ? t.name.last : "") + "</a>" + ("true" === t.aTeamCaptain ? '<i class="fas fa-star text-secondary"></i></span>' : "") + '<span class="amt-raised">NEED AMOUNT RAISED</span></div><div class="col-3 col-sm-4 d-flex justify-content-end"><a class="button btn-primary btn-lg" href="' + t.donationUrl + '"><span class="d-sm-none"><i class="fas fa-dollar-sign"></i> <i class="fas fa-chevron-right"></i></span><span class="d-none d-sm-inline">DONATE</span></a></div></div>'), e(".js__roster-results-container").slideDown()
                            })
                        },
                        error: function(a) {
                            e(".js__loading").hide(), e(".js__error-team-search").text(a.errorResponse.message).show()
                        }
                    }
                })
            }, e(".js__fade-anchor").on("click", function(a) {
                a.preventDefault(), e(".js__fade-content").css("max-height", "none"), e(".js__fade-anchor").remove()
            }), e(".js__back-to-top").on("click", function(a) {
                a.preventDefault(), e("body,html").animate({
                    scrollTop: 0
                }, 800)
            }), e("#registerModal").on("show.bs.modal", function(a) {
                e("body").removeClass("pushy-open-right modal-open")
            }), e("body").is(".pg_ride_search") && e(".js__refine-search").on("click", function(a) {
                a.preventDefault(), e(".js__refine-search-container").hide(), e(".js__search-tabs-container").show()
            }), e("body").is(".pg_ridepc") || e('a[href*="#"]').not('[href="#"]').not('[href="#0"]').on("click", function(a) {
                var t = e(this.hash);
                (t = t.length ? t : e("[name=" + this.hash.slice(1) + "]")).length && (a.preventDefault(), e("html, body").animate({
                    scrollTop: t.offset().top
                }, 1e3, function() {
                    var a = e(t);
                    if (a.focus(), a.is(":focus")) return !1;
                    a.attr("tabindex", "-1"), a.focus()
                }))
            }), e("body").is(".pg_ride_homepage"), e("body").is(".pg_ride_search")) {
            e(".js__participant-search-form").on("submit", function(a) {
                a.preventDefault(), e(".alert").hide(), e(".js__search-results-container").html("");
                var t = e("#participantFirstName").val(),
                    s = e("#participantLastName").val();
                cd.getParticipants(t, s, d, !0)
            }), e(".js__team-search-form").on("submit", function(a) {
                a.preventDefault(), e(".alert").hide(), e(".js__search-results-container").html("");
                var t = e("#teamName").val();
                cd.getTeams(t, d, !0)
            }), e(".js__company-search-form").on("submit", function(a) {
                a.preventDefault(), e(".js__search-results-container").html("");
                var t = e("#companyName").val();
                cd.getCompanies(t, !0)
            });
            var l = window.location.href,
                c = cd.getURLParameter(l, "search_for"),
                d = cd.getURLParameter(l, "search_type");
            switch ("donate" === d && e(".js__search-headline").text("Donate"), cd.autoSearchParticipant = function() {
                var a = cd.getURLParameter(l, "first_name") ? cd.getURLParameter(l, "first_name") : "",
                    t = cd.getURLParameter(l, "last_name") ? cd.getURLParameter(l, "last_name") : "";
                e("#participant-search-tab").tab("show"), cd.getParticipants(a, t, d, !0)
            }, cd.autoSearchTeam = function() {
                e("#team-search-tab").tab("show");
                var a = cd.getURLParameter(l, "team_name");
                cd.getTeams(a, d, !0)
            }, cd.autoSearchCompany = function() {
                e("#company-search-tab").tab("show");
                var a = cd.getURLParameter(l, "company_name");
                cd.getCompanies(a, !0)
            }, c) {
                case "participant":
                    cd.autoSearchParticipant();
                    break;
                case "team":
                    cd.autoSearchTeam();
                    break;
                case "company":
                    cd.autoSearchCompany()
            }
            e(".js__search-tabs").on("click", function(a) {
                e(".js__search-results-container").html("")
            })
        }
        if (e("body").is(".pg_ride_faq")) {
            var p = e(".js__faq-container li > .card ");
            e(p).each(function(a) {
                e(this).find(".card-header").attr("id", "faq_header" + a), e(this).find(".faq-title").attr({
                    "data-toggle": "collapse",
                    "data-target": "#faq_block_" + a,
                    "aria-expanded": "false",
                    "aria-controls": "faq_block_" + a
                }).append('<i class="fas fa-plus-square text-secondary"></i><i class="fas fa-minus-square text-secondary"></i>'), e(this).find(".collapse").attr({
                    id: "faq_block_" + a,
                    "aria-labelledby": "faq_block_" + a,
                    "data-parent": "#faqSearch"
                })
            });
            var _ = {
                    valueNames: ["faq-title", "keywords"]
                },
                m = new List("faqSearch", _);
            m.on("updated", function(a) {
                var t = e(".search").val().length;
                0 == a.matchingItems.length ? e(".js__no-faq-results").show() : (a.matchingItems.length, a.items.length, e(".js__no-faq-results").hide()), t > 0 ? e(".js__clear-faq-search").show() : e(".js__clear-faq-search").hide()
            }), e(".js__faq-search-form").on("submit", function(e) {
                e.preventDefault(), m.search()
            }), e(".js__clear-faq-search").on("click", function(a) {
                a.preventDefault(), e(".search").val(""), m.search(), e(".js__clear-faq-search").hide()
            })
        }
        if (cd.runThermometer = function(a, t) {
        		a = a.toString();
        		t = t.toString();
                var s = parseInt(a.replace("$", "").replace(",", "")) / parseInt(t.replace("$", "").replace(",", ""));
                isNaN(s) && (s = 0);
                !isFinite(s) && (s = 1);
                var n = 100 * s + "%";
                e(".js__progress-bar").css("width", n).attr("aria-valuenow", n), e(".js__percent-raised").each(function() {
                    e(this).prop("Counter", 0).animate({
                        Counter: n
                    }, {
                        duration: 1e3,
                        easing: "swing",
                        step: function(a) {
                            e(this).text(Math.ceil(a) + "%"), a > 80 && a <= 100 ? e(this).addClass("invert-percent-raised") : a > 100 && e(this).addClass("progress-goal-met")
                        }
                    })
                })
            }, e("body").is(".pg_ride_eventList")) {
            var u = [];
            if (e(".lc_Table tr a").each(function() {
                    u.push(this)
                }), 1 == u.length) {
                var h = e(".lc_Table tr a").attr("href");
                window.location = h
            }
        }
        if (e("body").is(".pg_entry")) {
            var f = e(".js__fundraiser-raised").text(),
                g = e(".js__fundraiser-goal").text();
            cd.runThermometer(f, g), cd.loadTopParticipantsRoster = function() {
                e("#frStatus4 .indicator-list-row").each(function(a) {
                    if (a < 5) {
                        var t = e(this).find(".team-honor-list-name a").attr("href"),
                            s = '<li class="list-group-item"><a class="roster-name" href="' + t + '">' + e(this).find(".team-honor-list-name a").text() + '</a><span class="roster-amt">' + e(this).find(".team-honor-list-value").text() + "</span></li>";
                        void 0 !== t && e(".js__top-participants-list").append(s)
                    }
                })
            }, cd.loadTopTeamsRoster = function() {
                e("#frStatus2 .team-honor-list-row").each(function(a) {
                    if (a < 5) {
                        var t = e(this).find(".team-honor-list-name a").attr("href"),
                            s = '<li class="list-group-item"><a class="roster-name" href="' + t + '">' + e(this).find(".team-honor-list-name a").text() + '</a><span class="roster-amt">' + e(this).find(".team-honor-list-value").text() + "</span></li>";
                        void 0 !== t && e(".js__top-teams-list").append(s)
                    }
                })
            }, cd.loadTopCompaniesRoster = function() {
                e(".js__default-company-roster").html(function(e, a) {
                    return a.replace(/&nbsp;&nbsp;/g, '<div class="company-roster-row">').replace("<br>", "</div>")
                });
                var a = [];
                e(".company-roster-row").each(function(t) {
                    if (t < 5) {
                        var s = e(this).find("a").attr("href"),
                            n = e(this).find("a").text();
                        a[t] = {
                            companyUrl: s,
                            companyName: n
                        }
                    }
                }), e("#frStatus3 .indicator-list-row").each(function(t) {
                    if (!(t < 5)) return !1;
                    var s = e(this).find(".list-value-container").text();
                    a[t].companyAmt = s
                }), e(a).each(function(t) {
                    var s = '<li class="list-group-item"><a class="roster-name" href="' + e(a)[t].companyUrl + '">' + e(a)[t].companyName + '</a><span class="roster-amt">' + e(a)[t].companyAmt + "</span></li>";
                    e(".js__top-companies-list").append(s)
                })
            }, cd.loadTopParticipantsRoster(), cd.loadTopTeamsRoster(), cd.loadTopCompaniesRoster(), e(".js__add-to-calendar").on("click", function(a) {
                a.preventDefault(), e(".js__calendar-menu").toggle()
            }), e(".js__greeting-intro").html(e("#fr_html_container").html())
        }
        if (e("body").is(".pg_personal")) {
            var v = e(".js__fundraiser-raised").text(),
                y = e(".js__fundraiser-goal").text();
            cd.runThermometer(v, y), e(".js__tr-story-text").html(e(".personal-page-description").html()), e(".js__top-donors-roster").append(e(".donor-list-indicator-container .vscroll-container")), e(".js__personal-bottom").append('<div class="row"><div class="col-12 text-center font-italic report-content">' + e(".tr-personal-page-footer > p").html() + "</div></div>")
        }
        if (e("body").is(".pg_team")) {
            var v = e(".js__fundraiser-raised").text(),
                y = e(".js__fundraiser-goal").text();
            cd.runThermometer(v, y), e(".js__tr-story-text").html(e(".team-description").html()), e(".js__top-donors-roster").append(e(".donor-list-indicator-container .vscroll-container"));
            var b = e("body").data("df-id"),
                j = e(".team-roster-participant-row ");
            e(j).each(function(a, t) {
                var s = e(this).find(".team-roster-participant-name").text(),
                    n = e(this).find(".team-roster-participant-name a").attr("href"),
                    i = !!e(this).find(".team-roster-participant-name").hasClass("team-roster-captain-name"),
                    r = n.split("px=")[1].split("&")[0],
                    o = "Donation2?df_id=" + b + "&PROXY_ID=" + r + "&PROXY_TYPE=20&FR_ID=" + cd.evID,
                    l = e(this).find(".team-roster-participant-raised").text().split("$"),
                    c = parseInt(l[1].replace(/,/g, ""));
                e(".js__roster-results-container").append('<div class="listItem row py-2 teammate-details"><div class="col-9 col-sm-8"><span class="teammate-name d-block"><a href="' + n + '" class="teammate-name text-primary js__teammate-name">' + s + "</a>" + (!0 === i ? '<i class="fas fa-star text-secondary"></i></span>' : "") + '<div class="amt-raised">$' + c + '</div></div><div class="col-3 col-sm-4 d-flex justify-content-end"><a class="button btn-primary btn-lg js__teammate-donate" href="' + o + '"><span class="d-sm-none"><i class="fas fa-dollar-sign"></i> <i class="fas fa-chevron-right"></i></span><span class="d-none d-sm-inline">DONATE</span></a></div></div>')
            }), e(".js__teammate-name").on("click", function(e) {
                ga("send", "event", "ride team", "click", "team-roster-name")
            }), e(".js__teammate-donate").on("click", function(e) {
                ga("send", "event", "ride team", "click", "team-roster-donate")
            });
            var _ = {
                    valueNames: ["teammate-name"]
                },
                w = new List("roster_search", _);
            w.on("updated", function(a) {
                var t = e(".search").val().length;
                0 == a.matchingItems.length ? e(".js__no-roster-results").show() : (a.matchingItems.length, a.items.length, e(".js__no-roster-results").hide()), t > 0 ? e(".js__clear-teammate-search").show() : e(".js__clear-teammate-search").hide()
            }), e(".js__participant-team-search").on("submit", function(e) {
                e.preventDefault(), w.search()
            }), e(".js__clear-teammate-search").on("click", function(a) {
                a.preventDefault(), e(".search").val(""), m.search(), e(".js__clear-teammate-search").hide()
            })
        }
        if (e("body").is(".pg_company")) {
            var k = e("#company_hierarchy_list_component > tbody > tr > td:nth-child(1) > span").text().trim(),
                x = (cd.getURLParameter(window.location.href, "company_id"), e(".total-goal-value").text().replace(".00", "")),
                R = e(".amount-raised-label:contains('Raised')").prev(".amount-raised-value").text(),
                T = e(".company-tally-title:contains('Total Recruited')").next(".company-tally-ammount").text(),
                P = e(".company-tally-title:contains('Number of Gifts')").next(".company-tally-ammount").text(),
                S = e(".js__coordinator-name").text(),
                D = e(".js__coordinator-email").text(),
                C = '<img class="img-fluid" src="' + e("#company_banner:eq(0) img").attr("src") + '" alt="' + e("#company_banner:eq(0) img").attr("alt") + '">';
            e(".js__tr-image").html(C), e(".js__company-name").text(k), e(".js__fundraiser-raised").text(R), e(".js__fundraiser-goal").text(x), e(".js__num-recruits").text(T), e(".js__num-donations").text(P), e(".js__tr-story-text").html(e(".company-description").html()), e(".js__coordinator-name-container").text(S), e(".js__coordinator-email-container").html('<a href="mailto:' + D + '">' + D + "</a>"), jQuery(".js__coordinator-email-container a").on("click", function() {
                ga("send", "event", "ride company", "click", "contact-email")
            });
            var I = e(".company-team-list");
            e(I).each(function(a, t) {
                var s = e(this).find(".company-team-list-team-name").text().trim(),
                    n = e(this).find(".company-team-list-team-name a").attr("href"),
                    i = e(this).find(".company-list-join-team-button").attr("href"),
                    r = e(this).find(".company-team-list-members").text(),
                    o = "$0";
                e("#company_page_frstatus_container .indicator-list-row").each(function(a, t) {
                    var n = e(this).find(".indicator-link").text().trim();
                    s === n && (o = e(this).find(".list-value-container").text().trim())
                }), e(".js__roster-results-container").append('<div class="row py-2 roster-details"><div class="col-9"><span class="roster-name d-block"><a href="' + n + '" class="text-primary js__top-teams-name">' + s + '</a></span><span class="num-members font-italic d-block">' + r + '</span><span class="amt-raised">' + o + '</span></div><div class="col-3 d-flex justify-content-end"><a class="button btn-primary btn-lg btn-block js__top-teams-join" href="' + i + '">Join</a></div></div>')
            });
            var E = e(".top-participants-container .trr-tbody tr"),
                b = e("body").data("df-id");
            e(E).each(function(a, t) {
                var s = e(this).find(".trr-table-row-link").text(),
                    n = e(this).find(".trr-table-row-link").attr("href"),
                    i = (e(this).find(".company-list-join-participant-button").attr("href"), n.split("px=")[1].split("&")[0]),
                    r = "Donation2?df_id=" + b + "&PROXY_ID=" + i + "&PROXY_TYPE=20&FR_ID=" + cd.evID,
                    o = e(this).find(".righted").text();
                e(".js__participants-roster-results-container").append('<div class="row py-2 roster-details"><div class="col-8 col-md-9"><span class="roster-name d-block"><a class="js__top-participants-name" href="' + n + '">' + s + '</a></span><span class="amt-raised">' + o + '</span></div><div class="col-4 col-md-3 d-flex justify-content-end"><a class="js__top-participants-donate button btn-primary btn-lg btn-block" href="' + r + '">Donate</a></div></div>')
            }), e(".js__top-teams-name").on("click", function(e) {
                ga("send", "event", "ride company", "click", "top-teams-name")
            }), e(".js__top-teams-join").on("click", function(e) {
                ga("send", "event", "ride company", "click", "top-teams-join")
            }), e(".js__top-participants-name").on("click", function(e) {
                ga("send", "event", "ride company", "click", "top-participants-name")
            }), e(".js__top-participants-donate").on("click", function(e) {
                ga("send", "event", "ride company", "click", "top-participants-donate")
            }), cd.runThermometer(R, x)
        }
        e("body").is(".app_donation") && (e("#fake-check #anonymous_fake").on("click", function() {
            e("#fake-check #anonymous_fake").is(":checked") ? e("#tr_recognition_nameanonymous_row input[type=checkbox]").each(function() {
                e(this).prop("checked", !1)
            }) : e("#fake-check #anonymous_fake").not(":checked") && e("#tr_recognition_nameanonymous_row input[type=checkbox]").each(function() {
                e(this).prop("checked", !0)
            })
        }), e("#fake-check #anonymous_fake").on("change", function() {
            e("input#tr_recognition_namerec_namename").attr("disabled", !this.checked)
        }), e("#pageLoadingMsg").hide(), e("#pstep_finish").show(), e('p:contains("You are making a donation to Edward Jones.")').html("You are making a donation to the Alzheimer's Association on behalf of Team Edward Jones."), e('p:contains("Edward Jones GWR")').html("You are making a donation to the Alzheimer's Association on behalf of Edward Jones for the Guinness World Record."), e("h2.section-header-container:eq(0)").attr("id", "giftInfoHdr"), e(".donation-levels input[type=radio]").each(function() {
            e(this).attr("aria-labelledby", "giftInfoHdr")
        }), e("#tr_recognition_namerec_namename").before(e("#displayNameAs")), e("#tr_recognition_namerec_namename").attr("aria-label", "Display my name as (optional)"), e(".donation-level-input-container label").addClass("donate_level"), e(".donation-level-input-container input").addClass("donate_input"), e(".donation-form-container").wrapInner("<div class='donate-body-content'></div>"), e("#billing_first_name_row, #billing_last_name_row, #donor_email_address_row, #donor_email_opt_in_Row").wrapAll('<div id="billing-info">'), e("#billing_addr_street1_row, #billing_addr_street2_row, #billing_addr_city_row, #billing_addr_state_row, #billing_addr_zip_row, #billing_addr_country_row").wrapAll('<div id="billing-address">'), e(".payment-type-dropdown").attr("aria-label", "Payment method"), e(".payment-type-dropdown").parent().parent().wrapAll('<div id="payment-select">'), e(".disclaimer").parent().css("width", "100%"), e(".show-mobile").parent().css("width", "100%"), e("#donor_matching_employersearchname").attr("autocomplete", "organization"), e("#responsive_payment_typecc_numbername, #responsive_payment_typecc_cvvname, .donation-level-user-entered input:visible").attr("pattern", "[0-9]*"), e(".donation-level-user-entered input:visible").attr("aria-label", "Other amount"), e("#ProcessForm").attr("novalidate", "novalidate"), 0 == e(".field-error-text").length && "" == e("#billing_addr_cityname").val() && "" == e("#billing_addr_state").val() && (e("#billing_addr_city_row").hide(), e("#billing_addr_state_row").hide()), e("#billing_addr_country").on("change", function(a) {
            "United States" !== e(this).val() && ("Canada" !== e(this).val() && e("#billing_addr_state").val("None"), e("#billing_addr_city_row").slideDown(), e("#billing_addr_state_row").slideDown())
        }), e("#billing_addr_zipname").on("keyup", function() {
            var a = e(this),
                t = e("#billing_addr_zip_row");
            a.val().length < 5 ? t.removeClass("error success") : a.val().length > 5 && "United States" == e("#billing_addr_country").val() || a.val().length > 7 && "Canada" == e("#billing_addr_country").val() ? t.addClass("error").removeClass("success") : 5 == a.val().length && "United States" == e("#billing_addr_country").val() ? e.ajax({
                url: "https://api.zippopotam.us/us/" + a.val(),
                cache: !1,
                dataType: "json",
                type: "GET",
                success: function(a, s) {
                    e(".ziperror").remove(), e("#billing_addr_city_row").slideDown(), e("#billing_addr_state_row").slideDown();
                    var n = a.places[0];
                    e("#billing_addr_cityname").val(n["place name"]), e("#billing_addr_state").val(n["state abbreviation"]), t.addClass("success").removeClass("error")
                },
                error: function(a, s) {
                    t.removeClass("success").addClass("error"), 0 == e(".ziperror").length && e("#billing-address").append('<div class="error ziperror">Please enter a valid zip code</div>')
                }
            }) : a.val().length <= 7 && "Canada" == e("#billing_addr_country").val() && e.ajax({
                url: "https://api.zippopotam.us/ca/" + a.val().substring(0, 3),
                cache: !1,
                dataType: "json",
                type: "GET",
                success: function(a, s) {
                    e(".ziperror").remove(), e("#billing_addr_city_row").slideDown(), e("#billing_addr_state_row").slideDown(), places = a.places[0], e("#billing_addr_cityname").val(places["place name"]), e("#billing_addr_state").val(places["state abbreviation"]), t.addClass("success").removeClass("error")
                },
                error: function(a, s) {
                    t.removeClass("success").addClass("error"), 0 == e(".ziperror").length && e("#billing-address").append('<div class="error ziperror">Please enter a valid zip code</div>')
                }
            })
        }), e("#ProcessForm").submit(function() {
            e("#ProcessForm").append('<input type="hidden" name="pstep_finish" value="Process My Donation" />'), e("#pstep_finish").attr("disabled", "disabled").addClass("disabled")
        }), e(".donation-levels").on("click", ".donate_level", function(a) {
            var t = e(a.target).closest(".donate_level"),
                s = t.find('input[type="radio"]').attr("name");
            e('.selected input[name="' + s + '"]').closest(".donate_level").removeClass("selected"), t.addClass("selected")
        }), e("#donate_double_text_field_input").closest(".custom-field-container").hide(), e.ajax({
            type: "POST",
            url: "https://donatedouble.org/donate_api.php",
            data: {
                api_key: "JasdkfCXfdje23sjfxCDFipjfseppcMDMM",
                json: '{"action":"read","type":"companies"}'
            },
            success: function(a) {
                e.each(a.companies, function(a) {
                    e("#donate_double_dropdown_dropdown").append(e("<option>").text(this.name.replace("&amp;", "&")).attr("value", a))
                })
            }
        }), e("#donate_double_dropdown_dropdown").change(function() {
            var a = e("#donate_double_dropdown_dropdown option:selected").text();
            e("#donate_double_text_field_input").val(""), e("#donate_double_text_field_input").val(a)
        }), e(".transaction-summary-info").length), e(".survey-form").length
    })
}(jQuery);