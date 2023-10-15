# ClockIn - Fingerprint Recognition Attendance System

## Overview
This project focuses on developing an open-source fingerprint recognition attendance system. The system aims to provide a one-stop solution that is free of monthly fees, user-friendly, and ensures seamless clock-in functionality for both employers and employees. With its intuitive design, it's tailored to enable non-tech-savvy employers to use the admin panel easily for user management.

## How it works
Originally, the first approach involved the use of the libfprint library, developed by the University of Manchester, for fingerprint recognition. However, a significant drawback was the high cost of biometric scanners compatible with this library. Hence, the approach shifted towards the Adafruit library, which offered more affordable and readily available hardware. While both the front-end and back-end are operational, they maintain constant communication through a websocket. Fingerprint data is stored securely on the local scanner, but once associated with a user, it's archived in the GCP database. When a valid fingerprint match is detected, the system automatically records the user's clock-in or clock-out time. Additionally, the system offers a range of administrative features, including a password-protected admin portal equipped with user management capabilities for adding and removing users.

## Hardware
- [DIYmall Optical Fingerprint Reader Sensor Module](https://www.amazon.com/dp/B077GKPWMN/ref=sspa_dk_detail_0?psc=1&pd_rd_i=B077GKPWMN&pd_rd_w=riTvZ&content-id=amzn1.sym.eb7c1ac5-7c51-4df5-ba34-ca810f1f119a&pf_rd_p=eb7c1ac5-7c51-4df5-ba34-ca810f1f119a&pf_rd_r=PXKGJR77S7GSBJ0KK8AD&pd_rd_wg=rt4wI&pd_rd_r=faeeb6b8-c388-40ad-a07f-33a76724b743&s=photo&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWw)
- [DIYmalls Nextion 2.4 inch HMI Display LCD 320x240](https://www.amazon.com/DIYmalls-Nextion-Resistive-Raspberry-NX3224T024/dp/B0B9GQQRVS/ref=sr_1_1_sspa?crid=2T4R448T5ZSS0&keywords=diymall%2B240x320&qid=1697375895&sprefix=%2Caps%2C53&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1)
- [Raspberry Pi 4 Computer Model B 8GB](https://www.amazon.com/Raspberry-Pi-Computer-Suitable-Workstation/dp/B0899VXM8F/ref=sr_1_4?crid=2PAE7NBI6QF2C&keywords=raspberry+pi+4&qid=1697375702&sprefix=raspberry%2Caps%2C81&sr=8-4)
- [ADAFRUIT Industries 954 USB-to-TTL Serial Cable](https://www.amazon.com/ADAFRUIT-Industries-954-Serial-Raspberry/dp/B00DJUHGHI/ref=sr_1_2?crid=WHOGL1ISA5KB&keywords=adafruit+uart+to+usb&qid=1697375959&sprefix=%2Caps%2C63&sr=8-2) (Optional)

## Future Enhancements
- End-to-end encryption for admin panel access
- Front-end schedule organizer integrated with existing software
- Text message notification for late user clock-ins

## Citation
1. [Adafruit_CircuitPython_Fingerprint](https://github.com/adafruit/Adafruit_CircuitPython_Fingerprint) - CircuitPython library for talking to UART-based Fingerprint sensors
2. [Hardware Set Up](https://core-electronics.com.au/guides/raspberry-pi/fingerprint-scanner-raspberry-pi/)
3. [Raspberry Pi UART Pinout Diagram UART](https://pinout.xyz/pinout/uart)

## Install
For the most up-to-date installation instructions, please refer to "INSTALL.md". If you encounter any issues during the installation process, feel free to reach out.
