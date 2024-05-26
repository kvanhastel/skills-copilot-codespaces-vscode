function skillsMembers() {
    var skills = ['a', 'b', 'c'];
    var members = [
        {
            name: 'John',
            skills: ['a', 'b']
        },
        {
            name: 'Jane',
            skills: ['c']
        },
        {
            name: 'Jack',
            skills: ['a', 'b', 'c']
        }
    ];

    return members.filter(function (member) {
        return member.skills.some(function (skill) {
            return skills.indexOf(skill) !== -1;
        });
    });
}