import { IPlanningItem } from '@interfaces/planner'

export const defaultPlanningItems: IPlanningItem[] = [
	{
		_id: 'item-1', // String ID instead of number
		title: 'Accommodation in Barcelona',
		description: 'Select a hotel for the 3-night stay in Barcelona',
		createdBy: 'Sophie Miller',
		date: '2023-08-15',
		projectId: 'project-123',
		dayIndex: 1,
		itemType: 'Hotel',
		status: 'Proposed',
		documents: [
			{
				_id: 'd1',
				planningItemId: 'item-1',
				uploaderId: 'user-1',
				uploaderType: 'AccManagers',
				fileName: 'Hotel_Comparison.pdf',
				storagePath: '/storage/documents/Hotel_Comparison.pdf',
				mimeType: 'application/pdf',
				size: '2.3 MB'
			},
			{
				_id: 'd2',
				planningItemId: 'item-1',
				uploaderId: 'user-1',
				uploaderType: 'AccManagers',
				fileName: 'Barcelona_Map.jpg',
				storagePath: '/storage/documents/Barcelona_Map.jpg',
				mimeType: 'image/jpeg',
				size: '1.1 MB'
			}
		],
		options: [
			{
				_id: '101',
				planningItemId: 'item-1',
				vendorId: 'vendor-101',
				vendorType: 'Hotel',
				planningNotes:
					'5-star luxury hotel with sea views. Located near the beach with excellent amenities including multiple restaurants, spa, and outdoor pools.',
				isClientSelected: false,
				createdBy: 'Sophie Miller',
				comments: [
					{
						_id: '1001',
						planningItemId: 'item-1',
						authorId: 'John Smith',
						authorName: 'John Smith',
						authorRole: 'AM',
						date: '2023-08-16',
						content:
							'I recommend this option for its proximity to our conference venue and stunning views.\n\nThe hotel also offers a special corporate rate for our guests that includes breakfast and airport transfers.'
					},
					{
						_id: '1002',
						planningItemId: 'item-1',
						authorId: 'Emma Watson',
						authorName: 'Emma Watson',
						authorRole: 'Client',
						date: '2023-08-17',
						content:
							"I like the location but I'm concerned about the price. Are there any special rates available?\n\nAlso, how far is it from the main conference center?"
					}
				]
			},
			{
				_id: '102',
				planningItemId: 'item-1',
				vendorId: 'vendor-102',
				vendorType: 'Hotel',
				planningNotes:
					'4-star boutique hotel in city center. Modern design with rooftop terrace and plunge pool. Walking distance to main attractions and shopping areas.',
				isClientSelected: false,
				createdBy: 'Sophie Miller',
				comments: [
					{
						_id: '1003',
						planningItemId: 'item-1',
						authorId: 'John Smith',
						authorName: 'John Smith',
						authorRole: 'AM',
						date: '2023-08-16',
						content:
							"This is a more budget-friendly option while still providing excellent quality and location.\n\nIt's just a 5-minute walk from the conference venue and close to restaurants and shops."
					}
				]
			}
		]
	},
	{
		_id: 'item-2',
		title: 'Welcome Dinner Venue',
		description: 'Select a restaurant for the welcome dinner',
		createdBy: 'David Johnson',
		date: '2023-08-16',
		projectId: 'project-123',
		dayIndex: 1,
		itemType: 'Meal',
		status: 'Discussing',
		documents: [
			{
				_id: 'd3',
				planningItemId: 'item-2',
				uploaderId: 'user-2',
				uploaderType: 'AccManagers',
				fileName: 'Restaurant_Menu.pdf',
				storagePath: '/storage/documents/Restaurant_Menu.pdf',
				mimeType: 'application/pdf',
				size: '1.5 MB'
			}
		],
		options: [
			{
				_id: '201',
				planningItemId: 'item-2',
				vendorId: 'vendor-201',
				vendorType: 'Restaurant',
				planningNotes:
					'Award-winning modern Mediterranean cuisine. Creative tasting menus in a bright, contemporary space. Two Michelin stars with innovative presentations.',
				isClientSelected: false,
				createdBy: 'David Johnson',
				comments: [
					{
						_id: '2001',
						planningItemId: 'item-2',
						authorId: 'Rachel Green',
						authorName: 'Rachel Green',
						authorRole: 'Client',
						date: '2023-08-17',
						content:
							'This looks amazing! Could they accommodate our group of 30 people?\n\nDo they have options for guests with dietary restrictions?'
					},
					{
						_id: '2002',
						planningItemId: 'item-2',
						authorId: 'John Smith',
						authorName: 'John Smith',
						authorRole: 'AM',
						date: '2023-08-18',
						content:
							"They can accommodate your group in their private dining area. I'll need to book soon to secure the reservation.\n\nThey're very accommodating with dietary restrictions and can create custom menus."
					}
				]
			}
		]
	},
	{
		_id: 'item-3',
		title: 'Transportation from Airport',
		description: 'Select transportation option from airport to hotel',
		createdBy: 'Sophie Miller',
		date: '2023-08-17',
		projectId: 'project-123',
		dayIndex: 1,
		itemType: 'Transfer',
		status: 'Confirmed',
		documents: [],
		options: [
			{
				_id: '301',
				planningItemId: 'item-3',
				vendorId: 'vendor-301',
				vendorType: 'Transport',
				planningNotes:
					'Fleet of 3 Mercedes Sprinter minibuses. Professional drivers, air-conditioned vehicles with WiFi. Brand new vehicles with ample luggage space.',
				isClientSelected: false,
				createdBy: 'Sophie Miller',
				comments: [
					{
						_id: '3001',
						planningItemId: 'item-3',
						authorId: 'John Smith',
						authorName: 'John Smith',
						authorRole: 'AM',
						date: '2023-08-18',
						content:
							'This is the most convenient option and provides a great first impression.\n\nThe drivers are all English-speaking and will track flight arrivals in case of delays.'
					}
				]
			},
			{
				_id: '302',
				planningItemId: 'item-3',
				vendorId: 'vendor-302',
				vendorType: 'Transport',
				planningNotes:
					'Airport taxi service for all participants. Direct service from airport to hotel. Flexible for different arrival times and group sizes.',
				isClientSelected: false,
				createdBy: 'Sophie Miller',
				comments: [
					{
						_id: '3002',
						planningItemId: 'item-3',
						authorId: 'Rachel Green',
						authorName: 'Rachel Green',
						authorRole: 'Client',
						date: '2023-08-19',
						content:
							'I think I prefer the minibus option for the group cohesion it provides.\n\nHowever, we do have some executives arriving on different flights. Would it be possible to arrange a mix of both options?'
					}
				]
			}
		]
	}
]
