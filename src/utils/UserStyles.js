import {StyleSheet} from 'react-native';
import CommonColors from './CommonColors';

export default userStyles = StyleSheet.create({
  sixteen_white_bold: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    lineHeight: 24,
    color: CommonColors.WHITE,
  },

  fifteen_semi_bold: {
    fontSize: 15,
    fontFamily: 'Montserrat-SemiBold',
    lineHeight: 24,
    color: CommonColors.TEXT_COLOR,
  },

  sixteen_regular: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    lineHeight: 24,
    color: CommonColors.TEXT_COLOR,
  },

  fourteen_bold: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    lineHeight: 24,
    color: CommonColors.TEXT_COLOR,
  },

  fourteen_semi_bold: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    lineHeight: 24,
    color: CommonColors.TEXT_COLOR_THREE,
  },

  fourteen_regular: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    lineHeight: 24,
    color: CommonColors.TEXT_COLOR,
  },

  twelve_semi_bold: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: CommonColors.TEXT_COLOR,
  },

  twelve_regular: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: CommonColors.TEXT_COLOR,
  },

  left_menu_sixteen: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    lineHeight: 24,
    color: CommonColors.WHITE,
  },
  round_button: {
    width: '100%',
    padding: 16,
    marginTop: 24,
    borderRadius: 36,
    backgroundColor: CommonColors.GREEN,
  },

  view_border: {
    height: 2,
    backgroundColor: '#EAEAEA',
    marginTop: 16,
    marginBottom: 16,
  },

  shadow: {
    shadowOffset: {width: 10, height: 10},
    shadowColor: '#D6E2F6',
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 16,
  },
  android_shadow: {
    shadowOffset: {width: 10, height: 10},
    shadowColor: '#D6E2F6',
    shadowOpacity: 1,
    shadowRadius: 2,
    borderColor: '#D6E2F6',
    elevation: 16,
  },
  elevated_layout: {
    width: '100%',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: CommonColors.WHITE,
    backgroundColor: CommonColors.WHITE,
    flexDirection: 'row',
    marginVertical: 12,
  },
  text_input: {fontSize: 16, flex: 1, padding: 12, marginLeft: 10},
  image: {
    marginLeft: 10,
    marginRight: 24,
    height: 24,
    width: 24,
    alignSelf: 'center',
  },

  icon_view: {
    height: 24,
    width: 24,
    tintColor: 'white',
    marginRight: 16,
  },
});
