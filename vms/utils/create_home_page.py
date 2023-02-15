"""Create home page."""

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
                    "add_bottom_padding": 1
                },
                {
                    "web_template": "Hero with Right Image",
                    "add_container": 1,
                },
                {
                    "web_template": "Top volunteers",
                    "add_container": 1,
                    "add_bottom_padding": 1
                },
                {
                    "web_template": "Current Activities",
                    "add_container": 1,
                    "add_bottom_padding": 1
                },
                {
                    "web_template": "Past Activities",
                    "add_container": 1,
                    "add_bottom_padding": 1
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
            "text_align": "Left"})
        doc.save(ignore_permissions=True, ignore_links=True)
        frappe.db.commit()
