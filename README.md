# ClockIn

## Overview
This project focuses on developing an open-source fingerprint recognition attendance system. The system aims to provide a one-stop solution that is free of monthly fees, user-friendly, and ensures seamless clock-in functionality for both employers and employees. With its intuitive design, it's tailored to enable non-tech-savvy employers to use the admin panel easily for user management.

## How it works
Originally, the first approach involved the use of the libfprint library, developed by the University of Manchester, for fingerprint recognition. However, a significant drawback was the high cost of biometric scanners compatible with this library. Hence, the approach shifted towards the Adafruit library, which offered more affordable and readily available hardware. While both the front-end and back-end are operational, they maintain constant communication through a websocket. Fingerprint data is stored securely on the local scanner, but once associated with a user, it's archived in the GCP database. When a valid fingerprint match is detected, the system automatically records the user's clock-in or clock-out time. Additionally, the system offers a range of administrative features, including a password-protected admin portal equipped with user management capabilities for adding and removing users.
