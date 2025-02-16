function skillsMember() {
  return {
    skills: ['HTML', 'CSS', 'JS', 'React', 'Node'],
    addSkill: function (newSkill) {
      this.skills.push(newSkill);
    },
  };
}