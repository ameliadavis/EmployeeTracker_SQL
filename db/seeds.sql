INSERT INTO department (department_name) VALUES ('Sales');
INSERT INTO department (department_name) VALUES ('Accounting');
INSERT INTO department (department_name) VALUES ('Marketing');
INSERT INTO department (department_name) VALUES ('Human Resources');

INSERT INTO _role (title, salary, department_id) VALUES ('Controller','90800','2');
INSERT INTO _role (title, salary, department_id) VALUES ('Account Executive','80000','1');
INSERT INTO _role (title, salary, department_id) VALUES ('Social Media Manager','58000','3');
INSERT INTO _role (title, salary, department_id) VALUES ('VP of Human Resources','76500','4');

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Moore', '4','2');
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Eric', 'Williams', '2','4');
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Shanise', 'Jones', '1','4');
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Erin', 'Tillbury', '3','1');