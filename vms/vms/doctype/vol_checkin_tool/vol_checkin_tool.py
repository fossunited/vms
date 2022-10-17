# Copyright (c) 2022, Shridhar Patil and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class VolCheckinTool(Document):
    pass


@frappe.whitelist()
def get_volunteer(date, department = None, branch = None, company = None):
    attendance_not_marked = []
    attendance_marked = []
    filters = {"enabled": 1}
    # if department != "All":
    #     filters["department"] = department
    # if branch != "All":
    #     filters["branch"] = branch
    # if company != "All":
    #     filters["company"] = company

    vol_list = frappe.get_list("User", fields=["name", "full_name"], filters=filters, order_by="full_name")
    marked_employee = {}
    for vol in frappe.get_list("Vol Checkin", fields=["user", "status"],
                               filters={"date": date}):

        marked_employee[vol['user']] = vol['status']

    for vol in vol_list:
        print(vol)
        vol['status'] = marked_employee.get(vol['name'])
        if vol['name'] not in marked_employee:
            attendance_not_marked.append(vol)
        else:
            attendance_marked.append(vol)
    return {
        "marked": attendance_marked,
        "unmarked": attendance_not_marked
    }
