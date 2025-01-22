# WorkHub

WorkHub is a scalable and secure platform that connects task experts with gigs seamlessly. Whether you're looking to publish a task or find your next opportunity, WorkHub simplifies the process with intuitive features, including location-based job searches. Empowering experts to find work efficiently, WorkHub ensures tasks reach the right hands quickly and effectively.

---
# Features of WorkHub:

- **Secure Register and Login**: Implements cookies with JWT-based authentication and authorization for secure user sessions.  
- **Forgot Password via Email Verification**: Allows users to reset their password securely through email verification.  
- **OAuth Integration**: Enables users to sign in with Google for a convenient and seamless login and register experience.  
- **Temporary Email Detection**: Identifies and blocks disposable email addresses to reduce fake users and maintain authenticity.  
- **Personalized Feed**: Delivers a customized feed based on user interests for enhanced engagement.  
- **Image Upload via Signed URL**: Reduces backend load by allowing secure and efficient direct uploads to cloud storage.  
- **Minimalistic and Responsive UI**: Provides a sleek, user-friendly design that ensures an amazing user experience across all screen sizes, from mobile devices to desktops.
- **Task Cleanup**: Automated cron job deletes inactive tasks older than one month to maintain system performance.  
- **Message Queue Integration**: Ensures fault tolerance by using a message queue for critical operations.  
- **Microservices Architecture**: Enables modular services for effortless scalability and independent deployment.  
---
## Getting Started

Follow the steps below to set up and run WorkHub locally:

### Step 1: Clone the Repository

```bash
git clone https://github.com/Manish-Kumarrrr/WorkHub_UI.git
cd workhub
```

### Step 2: Set Environment Variables

Create a `.env.local` file and add the following variables:

```plaintext
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
ARCJET_KEY=<your_arcjet_key>
```

### Step 3: Start the Application

Run the following commands to start the development server:

```bash
npm run dev
```

### Step 4: Set Up Other Services

Ensure the following services are set up and running:

- [Workhub_ApiGateway](https://github.com/Manish-Kumarrrr/WorkHub_ApiGateway.git)
- [WorkHub_User_Service](https://github.com/Manish-Kumarrrr/WorkHub_User_Service.git)
- [WorkHub_Task_Service](https://github.com/Manish-Kumarrrr/WorkHub_Task_Service.git)

### Step 5: Access the Application

Open your browser and navigate to:

[http://localhost:3000/login](http://localhost:3000/login)

---

## Tech Stack

WorkHub uses the following technologies:

- **Backend**: Java, Spring Boot, Spring Feign Client, Spring Security, JWT
- **Frontend**: React, Next.js, TailwindCSS, JavaScript
- **Database**: MongoDB, Redis
- **Message Broker**:Kafka 
- **Cloud Services**: Cloudinary, Vercel, Confluent

---

## Acknowledgments

- A big thanks to **Medium** and **Stack Overflow** for their invaluable community support and resources, which greatly helped in the development of this project.


---

**Happy Coding!** 🚀
