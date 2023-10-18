import {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/Ionicons';
import BottomNavigationBar from './src/components';
import BottomModal from './src/components/BottomModal';
import CenteredModal from './src/components/CenteredModal';

const App = () => {
  const [isPictureModalVisible, setPictureModalVisible] = useState(false);
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [postText, setPostText] = useState('');
  const [isPostSubmitted, setIsPostSubmitted] = useState(false);

  const openImagePicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        let imageUri = response.assets?.[0]?.uri as any;
        setSelectedPicture(imageUri);
      }
    });
  };

  const submitPost = () => {
    setIsPostSubmitted(true);
    setSelectedPicture(null);
    setSelectedLocation('');
    setSelectedCategory('');
    setPostText('');
    setTimeout(() => {
      setIsPostSubmitted(false);
    }, 3000);
  };

  const locations = ['New York', 'Los Angeles', 'Chicago', 'Miami'];
  const categories = ['Painting', 'Indigenious', 'Tattooing'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
            backgroundColor: '#41BCC4',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>HI</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={() => setPictureModalVisible(true)}>
            <Icon name="camera" size={25} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setLocationModalVisible(true)}>
            <IonIcons name="location-sharp" size={28} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCategoryModalVisible(true)}>
            <IonIcons name="menu-outline" size={30} color={'black'} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={submitPost}>
          {isPostSubmitted ? (
            <ActivityIndicator size={30} color="black" />
          ) : (
            <IonIcons name="send" size={30} color={'black'} />
          )}
        </TouchableOpacity>
      </View>

      <View>
        <TextInput
          style={styles.postInput}
          placeholder="Type here..."
          value={postText}
          placeholderTextColor="gray"
          onChangeText={text => setPostText(text)}
        />

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 15,
            alignItems: 'center',
          }}>
          {selectedPicture && (
            <View>
              <Image
                source={{uri: selectedPicture}}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 10,
                }}
              />
            </View>
          )}

          {isPictureModalVisible && (
            <TouchableOpacity onPress={openImagePicker}>
              <View
                style={{
                  backgroundColor: 'white',
                  width: 100,
                  height: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <Icon name="camera" size={25} color={'black'} />
              </View>
            </TouchableOpacity>
          )}
        </View>

        {selectedLocation && (
          <TouchableOpacity
            style={{
              display: 'flex',
              alignItems: 'center',
              borderColor: 'black',
              flexDirection: 'row',
              justifyContent: 'center',
              borderWidth: 1,
              borderRadius: 30,
              height: 30,
              marginTop: 20,
              gap: 3,
              width: 150,
            }}>
            <IonIcons name="location-sharp" size={20} color={'black'} />
            <Text style={{color: 'black'}}>{selectedLocation}</Text>
            <IonIcons
              onPress={() => setSelectedLocation('')}
              name="close"
              size={20}
              color={'black'}
            />
          </TouchableOpacity>
        )}

        {selectedCategory && (
          <TouchableOpacity
            style={{
              display: 'flex',
              alignItems: 'center',
              borderColor: 'black',
              flexDirection: 'row',
              justifyContent: 'center',
              borderWidth: 1,
              borderRadius: 30,
              height: 30,
              marginTop: 20,
              gap: 3,
              width: 150,
            }}>
            <Text style={{color: 'black', fontSize: 20}}>#</Text>
            <Text style={{color: 'black'}}>{selectedCategory}</Text>
            <IonIcons
              onPress={() => setSelectedCategory('')}
              name="close"
              size={20}
              color={'black'}
            />
          </TouchableOpacity>
        )}
      </View>

      <BottomModal
        visible={isLocationModalVisible}
        onClose={() => setLocationModalVisible(false)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 25,
            paddingHorizontal: 15,
            marginTop: 15,
          }}>
          <Icon name="search" size={20} color="black" />
          <TextInput value={postText} style={{color: 'black'}} />
        </View>
        <View style={{marginTop: 10}}>
          <FlatList
            data={locations}
            keyExtractor={item => item}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.locationItem}
                onPress={() => {
                  setSelectedLocation(item);
                  setLocationModalVisible(false);
                }}>
                <Text style={styles.locationItemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </BottomModal>

      <CenteredModal
        visible={isCategoryModalVisible}
        onClose={() => setCategoryModalVisible(false)}>
        <FlatList
          data={categories}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <View style={{marginRight: 10}}>
              <TouchableOpacity
                style={[
                  styles.categoryItem,
                  selectedCategory === item && {borderColor: '#D3D3D3'},
                ]}
                onPress={() => {
                  setSelectedCategory(item);
                }}>
                <Text
                  style={[
                    styles.categoryItemText,
                    selectedCategory === item && {color: 'white'},
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </CenteredModal>
      <BottomNavigationBar />
    </View>
  );
};

//all the styles in the main app component

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
  },
  locationItem: {
    padding: 10,
  },

  locationItemText: {
    color: 'black',
    fontSize: 16,
  },
  categoryItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryItem: {
    padding: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#41BCC4',
    borderRadius: 20,
  },
  categoryItemText: {color: 'black', fontSize: 16},
  header: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  postInput: {
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    color: 'black',
  },

  pictureButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  locationCategoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  locationButton: {
    backgroundColor: '#27ae60',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  categoryButton: {
    backgroundColor: '#f1c40f',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
  },
});

export default App;
