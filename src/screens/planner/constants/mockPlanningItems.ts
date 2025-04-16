// Mock data for planning items that's consistent with IPlanningItem interface
import { DisplayPlanningItem } from '../types'

export const mockPlanningItems: DisplayPlanningItem[] = [
	{
		_id: 'item-1', // String ID instead of number
		title: 'Accommodation in Barcelona',
		description: 'Select a hotel for the 3-night stay in Barcelona',
		createdBy: 'Sophie Miller',
		date: '2023-08-15',
		// Required IPlanningItem fields
		projectId: 'project-123',
		dayIndex: 1,
		itemType: 'Hotel',
		status: 'Proposed',
		documents: [
			{ id: 'd1', name: 'Hotel_Comparison.pdf', size: '2.3 MB' },
			{ id: 'd2', name: 'Barcelona_Map.jpg', size: '1.1 MB' }
		],
		options: [
			{
				id: '101',
				title: 'Hotel Arts Barcelona',
				description:
					'5-star luxury hotel with sea views. Located near the beach with excellent amenities including multiple restaurants, spa, and outdoor pools.',
				comments: [
					{
						id: '1001',
						author: 'John Smith',
						role: 'AM',
						date: '2023-08-16',
						text: 'I recommend this option for its proximity to our conference venue and stunning views.\n\nThe hotel also offers a special corporate rate for our guests that includes breakfast and airport transfers.'
					},
					{
						id: '1002',
						author: 'Emma Watson',
						role: 'Client',
						date: '2023-08-17',
						text: "I like the location but I'm concerned about the price. Are there any special rates available?\n\nAlso, how far is it from the main conference center?"
					}
				]
			},
			{
				id: '102',
				title: 'H10 Metropolitan',
				description:
					'4-star boutique hotel in city center. Modern design with rooftop terrace and plunge pool. Walking distance to main attractions and shopping areas.',
				comments: [
					{
						id: '1003',
						author: 'John Smith',
						role: 'AM',
						date: '2023-08-16',
						text: "This is a more budget-friendly option while still providing excellent quality and location.\n\nIt's just a 5-minute walk from the conference venue and close to restaurants and shops."
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
		// Required IPlanningItem fields
		projectId: 'project-123',
		dayIndex: 1,
		itemType: 'Meal',
		status: 'Discussing',
		documents: [{ id: 'd3', name: 'Restaurant_Menu.pdf', size: '1.5 MB' }],
		options: [
			{
				id: '201',
				title: 'Disfrutar Barcelona',
				description:
					'Award-winning modern Mediterranean cuisine. Creative tasting menus in a bright, contemporary space. Two Michelin stars with innovative presentations.',
				comments: [
					{
						id: '2001',
						author: 'Rachel Green',
						role: 'Client',
						date: '2023-08-17',
						text: 'This looks amazing! Could they accommodate our group of 30 people?\n\nDo they have options for guests with dietary restrictions?'
					},
					{
						id: '2002',
						author: 'John Smith',
						role: 'AM',
						date: '2023-08-18',
						text: "They can accommodate your group in their private dining area. I'll need to book soon to secure the reservation.\n\nThey're very accommodating with dietary restrictions and can create custom menus."
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
		// Required IPlanningItem fields
		projectId: 'project-123',
		dayIndex: 1,
		itemType: 'Transfer',
		status: 'Confirmed',
		documents: [],
		options: [
			{
				id: '301',
				title: 'Private Luxury Minibuses',
				description:
					'Fleet of 3 Mercedes Sprinter minibuses. Professional drivers, air-conditioned vehicles with WiFi. Brand new vehicles with ample luggage space.',
				comments: [
					{
						id: '3001',
						author: 'John Smith',
						role: 'AM',
						date: '2023-08-18',
						text: 'This is the most convenient option and provides a great first impression.\n\nThe drivers are all English-speaking and will track flight arrivals in case of delays.'
					}
				]
			},
			{
				id: '302',
				title: 'Individual Taxis',
				description:
					'Airport taxi service for all participants. Direct service from airport to hotel. Flexible for different arrival times and group sizes.',
				comments: [
					{
						id: '3002',
						author: 'Rachel Green',
						role: 'Client',
						date: '2023-08-19',
						text: 'I think I prefer the minibus option for the group cohesion it provides.\n\nHowever, we do have some executives arriving on different flights. Would it be possible to arrange a mix of both options?'
					}
				]
			}
		]
	}
]
