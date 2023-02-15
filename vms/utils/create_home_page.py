"""Create home page."""
import json
import frappe


def execute():
    """Create home page."""
    if not frappe.db.exists("Web Page", "home"):
        doc = frappe.get_doc({
            "doctype": "Web Page",
            "title": "Home",
            "route": "home",
            "published": 1,
            "content": "Page Builder",
            "page_blocks": [
                {
                    "web_template": "Hero with left image",
                    "add_container": 1,
                    "add_top_padding": 1,
                    "add_bottom_padding": 1,
                    "web_template_values": json.dumps({
                        "image": "/assets/frappe/images/frappe-framework-logo.svg",
                        "title": "Lorem ipsum dolor sit amet, consectetur adip",
                        "subtitle": "Lorem ipsum dolor sit amet, consectetur adipi scing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo", # noqa
                        "primary_action_url": "/checkin/new",
                        "primary_button_label": "CHECK-IN"
                    })
                },
                {
                    "web_template": "Hero with Right Image",
                    "add_container": 1,
                    "web_template_values": json.dumps({
                        "title": "Lorem ipsum dolor sit amet, consectetur",
                        "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", # noqa
                        "image": "/assets/frappe/images/frappe-framework-logo.svg",
                        "contain_image": 1
                        })
                },
                {
                    "web_template": "Top volunteers",
                    "add_container": 1,
                    "add_bottom_padding": 1,
                    "web_template_values": json.dumps({
                        "title": "Leaderboard",
                        "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt", # noqa
                        "limit": 10,
                        "activity": "Activity",
                        "location": "Location",
                        "metric": "Duration",
                        "secondary_button_required": 1,
                        "botton_label": "View More",
                        "seconday_button_url": "/volunteers"
                    })
                },
                {
                    "web_template": "Current Activities",
                    "add_container": 1,
                    "add_bottom_padding": 1,
                    "web_template_values": json.dumps({
                        "title": "Section title 1",
                        "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt" # noqa
                    })
                },
                {
                    "web_template": "Past Activities",
                    "add_container": 1,
                    "add_bottom_padding": 1,
                    "web_template_values": json.dumps({
                        "title": "Section title 1",
                        "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt" # noqa
                    })
                }
            ],
            "context_script": """context.no_cache = 1\ncontext.site_map = 1""",
            "javascript": """window.onload = function() {
            if (frappe.session.user != 'Guest'){
                    frappe.call({
                        'method': 'user_mapping',
                        callback: function(data) {
                            if(data.message != frappe.session.user){
                                window.location = '/volunteer-mapping/new'
                            }
                        }
                    });
                }
            };""",

            "full_width": 1,
            "text_align": "Left"
        })
        doc.insert(ignore_permissions=True, ignore_links=True)
        frappe.db.commit()

    if not frappe.db.exists("Web Page", "volunteers"):
        doc = frappe.get_doc({
            "doctype": "Web Page",
            "title": "volunteers",
            "route": "volunteers",
            "published": 1,
            "content": "Page Builder",
            "page_blocks": [{
                "web_template": "Top volunteers",
                "add_container": 1,
                "add_bottom_padding": 1,
                "web_template_values": json.dumps({
                    "title": "Leaderboard",
                    "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt", # noqa
                    "limit": 50,
                    "activity": "Activity",
                    "location": "Location",
                    "metric": "Duration",
                    "secondary_button_required": 0,
                    "botton_label": "View More",
                    "seconday_button_url": "/volunteers"
                })
            }]
        })
        doc.insert(ignore_permissions=True, ignore_links=True)
        frappe.db.commit()

    if not frappe.db.exists("Web Page", "user"):
        doc = frappe.get_doc({
            "doctype": "Web Page",
            "title": "user",
            "route": "v/<username>",
            "published": 1,
            "dynamic_route": 1,
            "content": "Page Builder",
            "page_blocks": [{
                "web_template": "User",
                "add_container": 1,
                "add_top_padding": 1,
                "add_bottom_padding": 1,
                "web_template_values": json.dumps({
                    "title": "Leaderboard",
                    "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt", # noqa
                    "limit": 50,
                    "activity": "Activity",
                    "location": "Location",
                    "metric": "Duration",
                    "secondary_button_required": 0,
                    "botton_label": "View More",
                    "seconday_button_url": "/volunteers"
                })
            },
            {
                "web_template": "User Volunteer",
                "add_container": 1,
                "add_bottom_padding": 1,
                "web_template_values": json.dumps({
                    "title": "Leaderboard",
                    "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt", # noqa
                    "limit": 50
                })
            }]
        })
        doc.insert(ignore_permissions=True, ignore_links=True)
        frappe.db.commit()
    if not frappe.db.exists("Web Page", "activity"):
        frappe.get_doc({
            "content_type": "HTML",
            "context_script": "context.no_cache = 1\ncontext.activity = frappe.db.sql(\n    \"\"\" SELECT a.*, SEC_TO_TIME(sum(c.hours_spent)) as checkin_count from `tabVol Activity` as a inner join `tabVol Checkin` as c on a.name = c.activity where a.name=%(activity)s\"\"\", args, as_dict=True)[0]\n\ncontext.checkins = frappe.db.sql(\"\"\" SELECT u.username, u.user_image as profile_thumbnail, u.full_name, SEC_TO_TIME(sum(c.hours_spent)) as checkin_count from `tabVol Checkin` c inner join `tabUser` as u on c.user = u.name where c.activity=%(activity)s group by c.user \"\"\", args, as_dict=True)", # noqa
            "css": ".section-markdown>.from-markdown {\n    max-width: 50rem;\n     margin: 0px; \n}", # noqa
            "doctype": "Web Page",
            "dynamic_route": 1,
            "full_width": 1,
            "insert_style": 1.
            "main_section_html": "<div class=\"container section section-padding-top section-padding-bottom\">\n    <div class=\"section-markdown\">\n        <div class=\"from-markdown\">\n            <h3  class=\"activity-title\">{{activity.name}}</h3>\n            <p class=\"activity-desc\">{{ activity.description }}</p>\n        </div>\n        <div class=\"row activity margin-top\">\n            <div class=\"col-md-4\" >\n                Total volunteers\n                <p>\n                    {{ checkins|length }}\n                </p>\n            </div>\n            <div class=\"col-md-4 \">\n                Total volunteer hours\n                <p>\n                    {{ activity.checkin_count }}\n                </p>\n            </div>\n        </div>\n        <div class=\"row activity margin-top\">\n            <div class=\"col-md-3\" >\n                Location\n                <p>\n                    {% if activity.city %}\n                    {{ activity.city }}\n                    {% else %}\n                    Pan India\n                    {% endif %}\n                </p>\n            </div>\n            <div class=\"col-md-3 \">\n                Start date\n                <p>\n                    {{ frappe.format_date(activity.start_date) }}\n                </p>\n            </div>\n            <div class=\"col-md-3 \">\n                End date\n                <p>\n                   {% if activity.end_date %} {{ frappe.format_date(activity.end_date) }} {%else%} - {% endif %}\n                </p>\n            </div>\n            <div class=\"col-md-3 \">\n                Status\n                <p class=\"{{ activity.status }}\">\n                    {{ activity.status }}\n                </p>\n            </div>\n        </div>\n    </div>\n</div>\n\n<section></section>\n\n\n<div class=\"section-padding-bottom\" data-section-idx=\"2\" data-section-template=\"Top volunteers\"><div class=\"container\">\n\n <p class=\"title\">Top Volunteers</p>\n    <div class=\"subtitle\"> subtitle </div>\n\n<table>\n        <tr>\n            <th class='table-header'></th>\n            <th class='table-header'></th>\n            <th class='table-header'>Name</th>\n            <th class='table-header'>Duration</th>\n        </tr>\n        {% for checkin in checkins %}\n        \n            <tr>\n                <td class='text-center'> {{loop.index}}.</td>\n                <td class='text-center'><span><img src={{checkin.profile_thumbnail}} width='50px' height='50px' style=\"border-radius: 50%;object-fit:cover;\" alt=\"Smiley face\" onerror=\"this.onerror=null; this.src='/files/VFI-logo.png'\"> </span></td>\n                <td class='border-bottom'> <a href=\"/v/{{ checkin.username }}\" style=\"width: 50%;\"> {{ checkin.full_name.title() }} </a></td>\n                <td class='border-bottom'>{{ checkin.checkin_count }}</td>\n            </tr>\n        {% endfor %}\n        \n    </table>\n    </div>\n    </div>" # noqa
            "published": 1,
            "route": "activity/<activity>",
            "text_align": "Left",
            "title": "Activity"
        })
        doc.insert(ignore_permissions=True, ignore_links=True)
        frappe.db.commit()
