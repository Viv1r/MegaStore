/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	await prisma.users.create({
		data: {
			name: 'Root',
			email: 'root',
			is_admin: true
		},
	});

	await prisma.users.create({
		data: {
			name: 'Andrey Alymov',
			email: 'andrey-alymov@hotmail.com',
			owned_stores: {
				createMany: {
					data: [
						{
							name: 'EShop-1'
						},
						{
							name: 'Fresh Foods'
						}
					]
				}
			}
		},
	});

	await prisma.categories.createMany({
		data: [
			{name: 'Outfit'},
			{name: 'Accessories'},
			{name: 'Electronics'},
			{name: 'Toys'},
			{name: 'Building materials'},
			{name: 'Food'},
			{name: 'Household appliances'},
			{name: 'Pet toys'}
		]
	});

	await prisma.products.createMany({
		data: [
			{
				title: 'iPhone XR',
				description: 'Test product №1',
				category_id: 3,
				store_id: 1,
				price: 499.90,
				count_available: 7
			},
			{
				title: 'iPhone 11',
				description: 'Test product №2',
				category_id: 3,
				store_id: 1,
				price: 549.90,
				count_available: 24
			},
			{
				title: 'iPhone 12',
				description: 'Test product №3',
				category_id: 3,
				store_id: 1,
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
				category_id: 3,
				store_id: 1,
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
				category_id: 3,
				store_id: 1,
				attributes: JSON.stringify({
					'RAM': '16GB DDR5',
					'Weight': '1.24kg'
				}),
				price: 679.90,
				count_available: 4712
			},
			{
				title: 'Fresh bread',
				description: 'Delicious',
				category_id: 6,
				store_id: 2,
				attributes: JSON.stringify({
					'Flour': 'The best wheat flour we have',
					'Tasty': 'Very tasty lol',
					'Crunchy': 'Of course',
					'Goes with butter': 'YES'
				}),
				price: 15,
				price_postfix: 'per oz',
				count_available: 47
			},
			{
				title: 'Potatoes',
				description: 'Good as nothing else, hot and fresh',
				category_id: 6,
				store_id: 2,
				attributes: JSON.stringify({
					'Tasty': 'Are you really asking? Heck yeah',
					'Mashed': 'No but you can mash'
				}),
				price: 50,
				price_postfix: 'per kg',
				count_available: 47
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