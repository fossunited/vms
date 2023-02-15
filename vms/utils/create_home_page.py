"""Create home page."""

import frappe


def execute():
    """Create home page."""
    if not frappe.db.exists("Web Page", "home"):
        doc = frappe.new_doc("Web Page")
        doc.title = "Home"
        doc.route = "home"
        doc.published = 1
        doc.content = "Page Builder"
        doc.page_blocks = [
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

        ]
        doc.context_script = """context.no_cache = 1
        context.site_map = 1"""
        doc.javascript = """window.onload = function() {
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
        };"""

        doc.full_width = 1
        doc.text_align = "Left"
        doc.save(ignore_permissions=True)
