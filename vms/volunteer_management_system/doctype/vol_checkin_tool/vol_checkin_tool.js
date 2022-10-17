// Copyright (c) 2022, Shridhar Patil and contributors
// For license information, please see license.txt

frappe.ui.form.on('Vol Checkin Tool', {
	// refresh: function(frm) {

	// }
	refresh: function(frm) {
		frm.disable_save();
	},

	onload: function(frm) {
		frm.set_value("date", frappe.datetime.get_today());
		frappe.volunteercheckin_tool.load_volunteers(frm);
	},
	date: function(frm) {
		frappe.volunteercheckin_tool.load_volunteers(frm);
	},
});


frappe.volunteercheckin_tool = {
	load_volunteers: function(frm) {
		if(frm.doc.date) {
			frappe.call({
				method: "vms.volunteer_management_system.doctype.vol_checkin_tool.vol_checkin_tool.get_volunteer?",
				args: {
					date: frm.doc.date
				},
				callback: function(r) {
					if(r.message['unmarked'].length > 0) {
						unhide_field('unmarked_checkins_section')
						if(!frm.volunteer_area) {
							frm.volunteer_area = $('<div>')
							.appendTo(frm.fields_dict.unmarked_volunteers.wrapper);
						}
						frm.VolunteerSelector = new frappe.VolunteerSelector(frm, frm.volunteer_area, r.message['unmarked'])
					}
					else{
						hide_field('unmarked_checkins_section')
					}

					if(r.message['marked'].length > 0) {
						unhide_field('marked_checkins_section')
						if(!frm.marked_volunteers) {
							frm.marked_volunteers = $('<div>')
								.appendTo(frm.fields_dict.marked_volunteers.wrapper);
						}
						frm.marked_employee = new frappe.VolunteerSelector(frm, frm.marked_volunteers, r.message['marked'])
					}
					else{
						hide_field('marked_checkins_section')
					}
				}
			});
		}
	}
}


frappe.VolunteerSelector = Class.extend({
	init: function(frm, wrapper, employee) {
		this.wrapper = wrapper;
		this.frm = frm;
		this.make(frm, employee);
	},
	make: function(frm, employee) {
		var me = this;

		$(this.wrapper).empty();
		var employee_toolbar = $('<div class="col-sm-12 top-toolbar" style="padding-bottom: 30px;">\
			<button class="btn btn-default btn-add btn-xs"></button>\
			<button class="btn btn-xs btn-default btn-remove"></button>\
			</div>').appendTo($(this.wrapper));

		var mark_employee_toolbar = $('<div class="col-sm-12 bottom-toolbar" style="margin-bottom: 20px;">\
			<button class="btn btn-primary btn-mark-present btn-xs"></button>\
			<button class="btn btn-default btn-mark-absent btn-xs"></button>')

		employee_toolbar.find(".btn-add")
			.html(__('Check all'))
			.on("click", function() {
				$(me.wrapper).find('input[type="checkbox"]').each(function(i, check) {
					if(!$(check).is(":checked")) {
						check.checked = true;
					}
				});
			});

		employee_toolbar.find(".btn-remove")
			.html(__('Uncheck all'))
			.on("click", function() {
				$(me.wrapper).find('input[type="checkbox"]').each(function(i, check) {
					if($(check).is(":checked")) {
						check.checked = false;
					}
				});
			});

		mark_employee_toolbar.find(".btn-mark-present")
			.html(__('Mark Present'))
			.on("click", function() {
				var vol_present = [];
				$(me.wrapper).find('input[type="checkbox"]').each(function(i, check) {
					if($(check).is(":checked")) {
						vol_present.push(employee[i]);
					}
				});
				frappe.call({
					method: "vms.volunteer_management_system.doctype.vol_checkin.vol_checkin.mark_volunteer_checkin",
					args:{
						"volunteer_list":vol_present,
						"status":"Approved",
						"date":frm.doc.date,
						"activity":frm.doc.activity,
						"time":frm.doc.time
					},

					callback: function(r) {
						frappe.volunteercheckin_tool.load_volunteers(frm);

					}
				});
			});

		mark_employee_toolbar.find(".btn-mark-absent")
			.html(__('Mark Absent'))
			.on("click", function() {
				var  vol_absent = [];
				$(me.wrapper).find('input[type="checkbox"]').each(function(i, check) {
					if($(check).is(":checked")) {
						 vol_absent.push(employee[i]);
					}
				});
				frappe.call({
					method: "vms.volunteer_management_system.doctype.vol_checkin.vol_checkin.mark_volunteer_checkin",
					args:{
						"volunteer_list": vol_absent,
						"status":"Approved",
						"date":frm.doc.date,
						"activity":frm.doc.activity,
						"time":frm.doc.time
					},

					callback: function(r) {
						frappe.volunteercheckin_tool.load_volunteers(frm);

					}
				});
			});


		var row;
		$.each(employee, function(i, m) {
				if (i===0 || (i % 4) === 0) {
				row = $('<div class="col-sm-12 row"     style="padding-bottom: 30px;"></div>').appendTo(me.wrapper);
			}

			$(repl('<div class="col-sm-3 unmarked-employee-checkbox">\
				<div class="checkbox">\
				<label><input type="checkbox" class="employee-check" employee="%(employee)s"/>\
				%(employee)s</label>\
				</div></div>', {employee: m.full_name})).appendTo(row);
		});

		mark_employee_toolbar.appendTo($(this.wrapper));
	}
});