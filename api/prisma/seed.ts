import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	await prisma.products.createMany({
		data: [
			{
				title: 'Iphone XR',
				description: 'Test product №1',
				price: 499.90,
				count_available: 7
			},
			{
				title: 'Iphone 11',
				description: 'Test product №2',
				price: 549.90,
				count_available: 24
			},
			{
				title: 'Iphone 12',
				description: 'Test product №3',
				attributes: JSON.stringify({
					'Screen resolution': '1170x2532 pixels',
					'Size': '6.06 inches'
				}),
				price: 679.90,
				count_available: 1523
			}
		]
	});

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
	})
}

main()
.then(async () => {
	await prisma.$disconnect()
})
.catch(async (e) => {
	console.error(e)
	await prisma.$disconnect()
	process.exit(1)
})