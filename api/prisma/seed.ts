import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	await prisma.users.create({
		data: {
			name: 'Andrey Alymov',
			email: 'andrey-alymov@hotmail.com',
			owned_stores: {
				createMany: {
					data: [
						{
							title: 'EShop-1'
						},
						{
							title: 'Fresh Bread'
						}
					]
				}
			}
		}
	});

	await prisma.products.createMany({
		data: [
			{
				title: 'iPhone XR',
				description: 'Test product №1',
				price: 499.90,
				count_available: 7
			},
			{
				title: 'iPhone 11',
				description: 'Test product №2',
				price: 549.90,
				count_available: 24
			},
			{
				title: 'iPhone 12',
				description: 'Test product №3',
				attributes: JSON.stringify({
					'Screen resolution': '1170x2532 pixels',
					'Size': '6.06 inches'
				}),
				price: 679.90,
				count_available: 1523
			},
			{
				title: 'MacBook Air',
				description: 'Test product №4',
				attributes: JSON.stringify({
					'Screen resolution': '2560x1600 pixels',
					'Screen size': '13.3 inches'
				}),
				price: 679.90,
				count_available: 143
			},
			{
				title: 'MacBook Air M2',
				description: 'Test product №5',
				attributes: JSON.stringify({
					'RAM': '16GB DDR5',
					'Weight': '1.24kg'
				}),
				price: 679.90,
				count_available: 4712
			}
		]
	});
}

main()
.then(async () => {
	await prisma.$disconnect()
})
.catch(async (e) => {
	console.error(e)
	await prisma.$disconnect()
	process.exit(1)
});