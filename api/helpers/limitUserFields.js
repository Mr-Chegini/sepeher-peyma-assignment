function limitUserFields(user) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

export default limitUserFields;
