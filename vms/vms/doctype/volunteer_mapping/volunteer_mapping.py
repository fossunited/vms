"""Volunteer Mapping."""
# Copyright (c) 2023, Shridhar Patil and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class VolunteerMapping(Document):
    """Volunteer city mapping."""

    def before_insert(self):
        """Set user."""
        if not self.user:
            self.user = frappe.session.user
