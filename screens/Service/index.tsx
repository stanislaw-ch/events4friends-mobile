import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import * as Linking from 'expo-linking';

// utils
import { COLORS } from '@utils/constants';
import { IService, INavigation, IRoute } from '@utils/interfaces';
import { calcSize, removeTags } from '@utils/misc';

// local
import WhatsappLink from './components/WhatsappLink';

interface ServiceScreenParams {
  route: IRoute;
  navigation: INavigation;
}

const ServiceScreen = (props: ServiceScreenParams) => {
  const { route } = props;
  const { service }: { service: IService } = route.params;

  let priceTag = null;

  if (service.isFree) {
    priceTag = <Text style={styles.serviceFree}>бесплатно</Text>;
  } else if (service.price) {
    priceTag = <Text style={styles.price}>от {service.price} руб.</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.contentContainer}
        bounces={false}
      >
        <View style={styles.serviceWrap}>
          <Text style={styles.service} numberOfLines={1}>
            {service.service}
          </Text>
        </View>
        <View style={styles.nameWrap}>
          <Text style={styles.name} numberOfLines={1}>
            {service.name}
          </Text>
        </View>
        <View style={styles.hr} />
        <View style={styles.descriptionContainer}>
          <Text>{removeTags(service.description)}</Text>
        </View>
        {Boolean(service.instagram) && (
          <View style={styles.locationContainer}>
            <Text style={styles.locationLabel}>Инстаграм:</Text>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`${service.instagram}`).then();
              }}
              style={styles.linkContainer}
            >
              <Text style={styles.link} numberOfLines={1}>
                {service.instagram}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {Boolean(service.website) && (
          <View style={styles.locationContainer}>
            <Text style={styles.locationLabel}>Сайт:</Text>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`${service.website}`).then();
              }}
              style={styles.linkContainer}
            >
              <Text style={styles.link} numberOfLines={1}>
                {service.website}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {Boolean(service.whatsapp) && Boolean(service.service) && (
          <WhatsappLink
            whatsapp={`${service.whatsapp}`}
            service={`${service.service}`}
          />
        )}
        {Boolean(service.telegram) && (
          <View style={styles.locationContainer}>
            <Text style={styles.locationLabel}>Telegram:</Text>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tg://resolve?domain=${service.telegram}`);
              }}
              style={styles.linkContainer}
            >
              <Text style={styles.link} numberOfLines={1}>
                {service.telegram}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {Boolean(service.vkontakte) && (
          <View style={styles.locationContainer}>
            <Text style={styles.locationLabel}>VKontakte:</Text>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`${service.vkontakte}`).then();
              }}
              style={styles.linkContainer}
            >
              <Text style={styles.link} numberOfLines={1}>
                {service.vkontakte}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {priceTag && <View style={styles.priceTagContainer}>{priceTag}</View>}
        <View style={styles.paddingBottomContainer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    width: '100%',
  },
  contentContainer: {
    alignItems: 'flex-start',
  },
  innerContainer: {
    width: calcSize(315),
    backgroundColor: COLORS.WHITE,
    marginTop: 30,
    marginBottom: 50,
    marginHorizontal: calcSize(30),
    borderRadius: calcSize(10),

    shadowColor: COLORS.DARK_GRAY,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  serviceWrap: {
    height: 40,
    paddingTop: 11,
    paddingHorizontal: calcSize(13),
  },
  service: {
    fontSize: 18,
    color: COLORS.STRONG_CYAN,
    fontWeight: 'bold',
  },
  nameWrap: {
    height: 40,
    paddingTop: 11,
    paddingHorizontal: calcSize(13),
  },
  name: {
    fontSize: 18,
    color: COLORS.DARK_GRAY,
    fontWeight: 'bold',
  },
  hr: {
    width: calcSize(355),
    height: 2,
    backgroundColor: COLORS.STRONG_CYAN,
    marginHorizontal: calcSize(10),
    marginTop: 20,
  },
  descriptionContainer: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: calcSize(15),
  },
  locationContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: calcSize(15),
  },
  locationLabel: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.DARK_GRAY,
  },
  linkContainer: {
    paddingVertical: 5,
  },
  link: {
    color: COLORS.BRIGHT_BLUE,
  },
  priceTagContainer: {
    position: 'absolute',
    bottom: calcSize(20),
    right: calcSize(12),
  },
  serviceFree: {
    fontSize: 18,
    color: COLORS.STRONG_CYAN,
  },
  price: {
    fontSize: 18,
    color: COLORS.DARK_GRAY,
  },
  paddingBottomContainer: {
    paddingBottom: calcSize(20),
  },
});

export default ServiceScreen;
