INSERT INTO departments (id, departments_name)
VALUES
    (1, 'Sales'),
    (2, 'Engineering'),
    (3, 'Finance'),
    (4, 'Legal')
;

INSERT INTO roles (title, salary, departments_id)
VALUES
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4)
;

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Mike', 'Chan', 1, NULL),
    ('Ashley', 'Rodriguez', 2, NULL),
    ('Kevin', 'Tupik', 3, NULL),
    ('Kunal', 'Singh', 4, NULL),
    ('Malia', 'Brown', 5, NULL),
    ('Sarah', 'Lourd', 6, NULL),
    ('Tom', 'Allen', 7, NULL)
;
