import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  listWrapper: {
    flex: 1,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0397C8',
  },
  footer: {
    marginTop: 10,
    marginBottom: Platform.OS === 'android' ? 20 : 0
  },
  loadMorBtn: {
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: '#0397C8',
    padding: 10,
    borderRadius: 8,
  },
  loadMoreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
