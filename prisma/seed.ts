import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const questionData = [
        // General
        { title: 'Have you traveled outside your home country?', categoryName: 'general' },
        { title: 'Enjoy solving puzzles?', categoryName: 'general' },
        { title: 'Read a book in the past month?', categoryName: 'general' },
        { title: 'Believe in supernatural phenomena?', categoryName: 'general' },
        { title: 'Tried food from a different culture?', categoryName: 'general' },
      
        // Life Style
        { title: 'Practice meditation regularly?', categoryName: 'lifestyle' },
        { title: 'Gardening as a hobby?', categoryName: 'lifestyle' },
        { title: 'Prefer cooking at home over eating out?', categoryName: 'lifestyle' },
        { title: 'Enjoy going for long walks?', categoryName: 'lifestyle' },
        { title: 'Tried a vegan diet?', categoryName: 'lifestyle' },
      
        // Fashion
        { title: 'Follow the latest fashion trends?', categoryName: 'fashion' },
        { title: 'Favorite activity: shopping for clothes?', categoryName: 'fashion' },
        { title: 'Pay attention to the brands you wear?', categoryName: 'fashion' },
        { title: 'Wear mismatched socks intentionally?', categoryName: 'fashion' },
        { title: 'Own any designer clothing items?', categoryName: 'fashion' },
      
        // Technology
        { title: 'Comfortable using smartphones?', categoryName: 'technology' },
        { title: 'Regularly use social media platforms?', categoryName: 'technology' },
        { title: 'Built your own computer?', categoryName: 'technology' },
        { title: 'Stay updated on tech news?', categoryName: 'technology' },
        { title: 'Consider yourself tech-savvy?', categoryName: 'technology' },
      
        // Business
        { title: 'Started your own business?', categoryName: 'business' },
        { title: 'Follow the stock market?', categoryName: 'business' },
        { title: 'Networking an important part of your career?', categoryName: 'business' },
        { title: 'Invest in a startup company?', categoryName: 'business' },
        { title: 'Attended a business conference?', categoryName: 'business' },
      
        // Economy
        { title: 'Keep track of inflation rates?', categoryName: 'economy' },
        { title: 'Familiar with the concept of GDP?', categoryName: 'economy' },
        { title: 'Invested in precious metals?', categoryName: 'economy' },
        { title: 'Follow discussions about unemployment rates?', categoryName: 'economy' },
        { title: 'Consider studying economics?', categoryName: 'economy' },
      
        // Sport
        { title: 'Enjoy watching basketball games?', categoryName: 'sport' },
        { title: 'Played soccer at a competitive level?', categoryName: 'sport' },
        { title: 'Swimming as a favorite exercise?', categoryName: 'sport' },
        { title: 'Follow the Olympics?', categoryName: 'sport' },
        { title: 'Participate in a marathon?', categoryName: 'sport' },
      
        // People
        { title: 'Find it easy to make new friends?', categoryName: 'people' },
        { title: 'Interested in learning about different cultures?', categoryName: 'people' },
        { title: 'Enjoy attending social gatherings?', categoryName: 'people' },
        { title: 'Consider yourself an extrovert?', categoryName: 'people' },
        { title: 'Actively engage in volunteer work?', categoryName: 'people' },
      
        // Country
        { title: 'Born in the country you currently live in?', categoryName: 'country' },
        { title: 'Visited all major cities in your country?', categoryName: 'country' },
        { title: "Know your country's national anthem?", categoryName: 'country' },
        { title: 'Follow local news regularly?', categoryName: 'country' },
        { title: 'Explored historical sites in your country?', categoryName: 'country' },
      
        // Politics
        { title: 'Keep up with current political events?', categoryName: 'politics' },
        { title: 'Participated in a protest or rally?', categoryName: 'politics' },
        { title: 'Identify with a particular political party?', categoryName: 'politics' },
        { title: 'Consider running for a political office?', categoryName: 'politics' },
        { title: 'Engage in political discussions with friends and family?', categoryName: 'politics' },
      ];

  for (const data of questionData) {
    await prisma.question.create({
      data: {
        createdAt: new Date(),
        updatedAt: new Date(),
        content: '',
        published: false,
        viewCount: 0,
        authorId: 'fef0047f-5760-41cd-ad91-a458d9073cd5',
        imageUrl: '',
        ...data,
      },
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
