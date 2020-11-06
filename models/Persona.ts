export interface Persona {
  id: number,
  name: string,
  initials: string,
  color: string,
  avatar: string
}

export enum FieldTypes {
  SHORT_TEXT = 'short_text',
  LONG_TEXT = 'long_text',
  IMAGE = 'image',
  IMAGE_GALLERY = 'image_gallery',
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

export interface Field {
  id: number
  title: string
  field_type: FieldTypes
  data: string
  column_id: number
  prev_id: number | null
  next_id: number | null
}
