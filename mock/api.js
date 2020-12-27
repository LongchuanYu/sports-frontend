export default {
    'GET /api/training': [{
        name: 'sover',
        label: '坐姿推胸',
        category: 'chest',
        values: [{
            weight: 30,
            numbers: 20
        },{
            weight: 30,
            numbers: 20
        },{
            weight: 30,
            numbers: 15
        }]
    },{
        name: 'leg_press',
        label: '腿部推蹬机',
        category: 'leg',
        values: [{
            weight: 30,
            numbers: 20
        },{
            weight: 30,
            numbers: 20
        }]
    }],

    'GET /api/training/actions-lib': [{
        name: 'sover',
        label: '坐姿推胸',
        category: 'chest',
        values: [{weight: 0, numbers: 0}]
    },{
        name: 'leg_press',
        label: '腿部推蹬机',
        category: 'leg',
        values: [{weight: 0, numbers: 0}]
    }]
}