import devices from 'puppeteer/DeviceDescriptors';

const supportDevice = {
  BlackberryPlayBook: 'Blackberry PlayBook',
  BlackberryPlayBookLandscape: 'Blackberry PlayBook landscape',
  BlackBerryZ30: 'BlackBerry Z30',
  BlackBerryZ30Landscape: 'BlackBerry Z30 landscape',
  GalaxyNote3: 'Galaxy Note 3',
  GalaxyNote3Landscape: 'Galaxy Note 3 landscape',
  GalaxyNoteII: 'Galaxy Note II',
  GalaxyNoteIILandscape: 'Galaxy Note II landscape',
  GalaxySIII: 'Galaxy S III',
  GalaxySIIILandscape: 'Galaxy S III landscape',
  GalaxyS5: 'Galaxy S5',
  GalaxyS5Landscape: 'Galaxy S5 landscape',
  iPad: 'iPad',
  iPadLandscape: 'iPad landscape',
  iPadMini: 'iPad Mini',
  iPadMiniLandscape: 'iPad Mini landscape',
  iPadPro: 'iPad Pro',
  iPadProLandscape: 'iPad Pro landscape',
  iPhone4: 'iPhone 4',
  iPhone4Landscape: 'iPhone 4 landscape',
  iPhone5: 'iPhone 5',
  iPhone5Landscape: 'iPhone 5 landscape',
  iPhone6: 'iPhone 6',
  iPhone6Landscape: 'iPhone 6 landscape',
  iPhone6Plus: 'iPhone 6 Plus',
  iPhone6PlusLandscape: 'iPhone 6 Plus landscape',
  KindleFireHDX: 'Kindle Fire HDX',
  KindleFireHDXLandscape: 'Kindle Fire HDX landscape',
  LGOptimusL70: 'LG Optimus L70',
  LGOptimusL70Landscape: 'LG Optimus L70 landscape',
  MicrosoftLumia550: 'Microsoft Lumia 550',
  MicrosoftLumia950: 'Microsoft Lumia 950',
  MicrosoftLumia950Landscape: 'Microsoft Lumia 950 landscape',
  Nexus10: 'Nexus 10',
  Nexus10Landscape: 'Nexus 10 landscape',
  Nexus4: 'Nexus 4',
  Nexus4Landscape: 'Nexus 4 landscape',
  Nexus5: 'Nexus 5',
  Nexus5Landscape: 'Nexus 5 landscape',
  Nexus5X: 'Nexus 5X',
  Nexus5XLandscape: 'Nexus 5X landscape',
  Nexus6: 'Nexus 6',
  Nexus6Landscape: 'Nexus 6 landscape',
  Nexus6P: 'Nexus 6P',
  Nexus6PLandscape: 'Nexus 6P landscape',
  Nexus7: 'Nexus 7',
  Nexus7Landscape: 'Nexus 7 landscape',
  NokiaLumia520: 'Nokia Lumia 520',
  NokiaLumia520Landscape: 'Nokia Lumia 520 landscape',
  NokiaN9: 'Nokia N9',
  NokiaN9Landscape: 'Nokia N9 landscape',
};

const checkIfOptions = options => (typeof options === 'object' && 'viewport' in options && 'userAgent' in options);
const checkIfSupportDevice = device => supportDevice[device] !== undefined;

function filterEmulateInfos(options) {
  switch (true) {
    case checkIfOptions(options):
      return options;
    case checkIfSupportDevice(options):
      return devices[supportDevice[options]];
    default:
      // eslint-disable-next-line no-console
      if (options !== undefined) console.warn('skip page.emulate'.warn);
      return false;
  }
}

export default filterEmulateInfos;
