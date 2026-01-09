export const getNextScreen = ({ role, skills, experience }) => {
  if (!role || role.trim() === '') return 'PracticeRoleScreen';
  if (!Array.isArray(skills) || skills.length === 0)
    return 'PracticeRequiredSkills';
  if (!experience || experience.trim() === '')
    return 'PracticeExpScreen';
  return 'PracticeInterviewStart';
};
