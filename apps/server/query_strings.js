module.exports = {
  insert_into_add_new_user(username, password, email, emailNotification) {
    return `INSERT INTO Users (username, password, email, emailNotifications) VALUES ("${username}", "${password}", "${email}", ${emailNotification})`;
  },

  get_user_by_username(username) {
    return `SELECT * FROM Users WHERE username = "${username}"`;
  },

  add_data_to_anyToken(username, field, token) {
    return `UPDATE Users SET ${field} = '${token}' WHERE (username = '${username}');`;
  },

  change_password(username, password) {
    return `UPDATE Users SET password = '${password}' WHERE (username = '${username}');`;
  },

  change_groupid(reportid, groupid) {
    return `UPDATE Report SET group_id = '${groupid}' WHERE (id = '${reportid}');`;
  },

  null_token(username, field) {
    return `UPDATE Users SET ${field} = NULL WHERE (username = '${username}')`;
  },

  insert_into_add_new_page(userid, pageTitle, subheading, background, colorScheme, link) {
    return `INSERT INTO Pages (users_id, page_title, subheading, background, color_scheme, link_slug) VALUES (${userid}, "${pageTitle}", "${subheading}", "${background}", ${colorScheme}, "${link}")`;
  },

  insert_into_add_new_inputfield(pagesId, type, placeholder) {
    return `INSERT INTO Input_Field (pages_id, type, placeholder) VALUES (${pagesId}, '${type}', "${placeholder}")`;
  },

  change_page(userid, pageTitle, subheading, background, colorScheme) {
    return `UPDATE Pages SET page_title = "${pageTitle}", subheading = "${subheading}", background = "${background}", color_scheme = ${colorScheme} WHERE (users_id = '${userid}');`;
  },

  change_link(userid, link) {
    return `UPDATE Pages SET link_slug = "${link}" WHERE (users_id = '${userid}');`;
  },

  select_with_where(tableName, column, value) {
    return `SELECT * FROM ${tableName} WHERE (${column} = "${value}")`;
  },

  delete_inputfields(pagesId) {
    return `DELETE FROM Input_Field WHERE (pages_id = ${pagesId})`;
  },

  getEveryReportForUser(userid) {
    return `SELECT * FROM \`Group\` JOIN \`Report\` ON Group.id= Report.group_id WHERE Group.users_id=${userid}`;
  },

  getEveryInputFieldForPage(link) {
    return `SELECT * FROM \`Pages\` JOIN \`Input_Field\` ON Pages.id= Input_Field.pages_id WHERE Pages.link_slug='${link}' ORDER BY Input_Field.id ASC`;
  },

  getReportData(reportid) {
    return (
      'SELECT * FROM Report JOIN '
      + '`Input`'
      + ` ON Report.id = Input.report_id WHERE \`Report\`.\`id\`=${reportid}`
    );
  },

  deleteInputs(reportid) {
    return `DELETE FROM Input WHERE \`report_id\` = ${reportid}`;
  },

  deleteReport(reportid) {
    return `DELETE FROM Report WHERE \`id\` = ${reportid}`;
  },

  addNewReport(userID, email, groupId) {
    return `INSERT INTO Report (users_id, reporter_email, state, group_id) VALUES (${userID}, "${email}", 0, ${groupId})`;
  },

  addNewInput(inputName, value, reportId, number) {
    return `INSERT INTO Input (input_name, value, report_id, number) VALUES ("${inputName}", "${value}", ${reportId}, ${number})`;
  },

  addGroup(name, color, usersId) {
    return `INSERT INTO \`Group\` (name, color, users_id) VALUES ("${name}", "${color}", ${usersId})`;
  },

  select_with_where_for_group_num(field, value) {
    return `SELECT * FROM \`Group\` WHERE ${field} = ${value}`;
  },

  select_with_where_for_group_2(field1, value1, field2, value2) {
    return `SELECT * FROM \`Group\` WHERE (${field1} = ${value1} AND (${field2} = "${value2}"))`;
  },

  select_with_where_num(tableName, column, valNum) {
    return `SELECT * FROM ${tableName} WHERE (${column} = ${valNum})`;
  },

  addPage(username, userid) {
    return `INSERT INTO Pages (page_title, subheading, background, color_scheme, link_slug, users_id) VALUES ('${username}', 'Customize it from the admin page!', '#000000', 1, '${username}', ${userid})`;
  },

  addField(pageid) {
    return `INSERT INTO Input_Field (type, placeholder, pages_id) VALUES (0, 'Add custom fields at tickit admin!', ${pageid})`;
  },

  addFieldWithData(type, placeholder, pageid, number) {
    return `INSERT INTO Input_Field (type, placeholder, pages_id,number) VALUES (${type}, "${placeholder}", ${pageid}, ${number})`;
  },

  changePageData(pageTitle, subheading, background, colorScheme, linkSlug, usersId) {
    return `UPDATE Pages SET page_title = "${pageTitle}", subheading = "${subheading}", background = "${background}", color_scheme = ${colorScheme}, link_slug = "${linkSlug}" WHERE users_id = ${usersId}`;
  },

  saveUSetting(userId, username, email, emailNotification) {
    return `UPDATE Users SET username = "${username}", email = "${email}", emailNotifications = ${emailNotification} WHERE id = ${userId}`;
  },

  deleteGroups(id) {
    return `DELETE FROM \`Group\` WHERE id = ${id}`;
  },

  updateGroup(name, color, id) {
    return `UPDATE \`Group\` SET name = "${name}", color = "${color}" WHERE id = ${id}`;
  },

  updateReportGroup(id, ungroupedID) {
    return `UPDATE \`Report\` SET group_id = ${ungroupedID} WHERE group_id = ${id}`;
  },
};
