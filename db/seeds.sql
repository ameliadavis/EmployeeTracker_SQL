INSERT INTO department (department_name) VALUES ('Sales');
INSERT INTO department (department_name) VALUES ('Accounting');
INSERT INTO department (department_name) VALUES ('Marketing');
INSERT INTO department (department_name) VALUES ('Human Resources');


INSERT INTO _role (title, salary, department_id) VALUES ('Controller','108,000.00','2');
INSERT INTO _role (title, salary, department_id) VALUES ('Account Executive','90,000.00','1');
INSERT INTO _role (title, salary, department_id) VALUES ('Social Media Manager','58,000.00','3');
INSERT INTO _role (title, salary, department_id) VALUES ('VP of Human Resources','110,000.00','4');

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Moore', '4','');
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Eric', 'Williams', '2','');
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Shanise', 'Jones', '1','4');
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Erin', 'Tillbury', '3','');