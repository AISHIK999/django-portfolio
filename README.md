# Django Portfolio

[Check it out](https://aishik999.vercel.app)

A portfolio website built using the Django framework with sections to showcase projects, skills, and contact information.

## Features
  - Responsive design
  - User-friendly interface
  - Easy to customize
  
## Technologies Used
  - Django
  - HTML
  - CSS
  - JavaScript

## Installation
  1. Clone the repository
  ```bash
  git clone https://github.com/aishik999/django-portfolio.git
  ```
  2. Install dependencies
  ```bash
  pip install -r requirements.txt
  ```
  3. Make changes to the codebase at `website/templates/website/index.html`
  
    - Add new sections or modify existing ones
    - Update styles and scripts as needed
    - Create a superuser
  ```bash
  python manage.py createsuperuser
  ```
  4. Deploy
  ```bash
  python manage.py makemigrations
  python manage.py migrate
  python manage.py runserver
  ```
  5. Access the superuser dashboard at `http://localhost:8000/admin`
  6. Add contents to the website
  ### NOTE: 
  The `badge link` needed in the projects can be taken from [Skillicons](https://skillicons.dev). For example, `https://skillicons.dev/icons?i=linux,postgres,py&perline=3`
  
  ### TODO:
  - Make changes to make it deployable to vercel like in production
  - Ability change the order of projects