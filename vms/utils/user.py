"""Update username."""
import frappe

import string
import random


def username(doc, method=None):
    """Update username."""
    size = 6
    chars = string.ascii_uppercase + string.digits

    username = ''.join(random.choice(chars) for _ in range(size))
    while(frappe.db.get_value("User", {"username": username}, "name")):
        username = ''.join(random.choice(chars) for _ in range(size))

    doc.username = username.upper()


@frappe.whitelist(allow_guest=True)
def mapping():
    """Get user mapping."""
    if frappe.session.user == 'Guest':
        frappe.response['message'] = frappe.session.user
    else:
        frappe.response['message'] = frappe.db.get_value(
            "Volunteer Mapping", frappe.session.user, "name"
        )
