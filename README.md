# WorkHub

WorkHub is a scalable and secure platform that connects task experts with gigs seamlessly. Whether you're looking to publish a task or find your next opportunity, WorkHub simplifies the process with intuitive features, including location-based job searches. Empowering experts to find work efficiently, WorkHub ensures tasks reach the right hands quickly and effectively.

---

## Getting Started

Follow the steps below to set up and run WorkHub locally:

### Step 1: Clone the Repository

```bash
git clone <repo-url>
cd workhub
```

### Step 2: Set Environment Variables

Create a `.env.local` file and add the following variables:

```plaintext
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
```

### Step 3: Start the Application

Run the following commands to start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Step 4: Set Up Other Services

Ensure the following services are set up and running:

- **workhub_api_gateway**
- **workhub_user_service**
- **workhub_task_service**

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

Thanks to the tools and technologies that made this project possible:
- [Cloudinary](https://cloudinary.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Vercel](https://vercel.com/)

---

**Happy Coding!** 🚀
