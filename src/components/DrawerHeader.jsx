import { useNavigation } from '@react-navigation/native';

const DrawerHeader = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      {/* burger icon */}
    </TouchableOpacity>
  );
};

export default DrawerHeader;
