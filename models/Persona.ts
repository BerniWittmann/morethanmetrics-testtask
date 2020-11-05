export interface Persona {
  id: number,
  name: string,
  initials: string,
  color: string,
  avatar: string
}

export enum FieldTypes {
  SHORT_TEXT = 'short-text',
  LONG_TEXT = 'long-text',
  IMAGE = 'image',
  IMAGE_GALLERY = 'image-gallery',
  NUMBER = 'number',
}

export enum PersonaColumnWidth {
  THIN = 'thin',
  NORMAL = 'normal',
  WIDE = 'wide'
}
export interface PersonaColumn {
  id: number,
  width: PersonaColumnWidth
}
