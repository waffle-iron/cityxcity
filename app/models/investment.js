import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr("string"),
  address: DS.attr("string"),
  contact: DS.attr("string"),
  employer: DS.attr("string"),
  activating: DS.attr("string"),
  latitude: DS.attr("number"),
  longitude: DS.attr("number"),
  value: DS.attr("number"),
  type: DS.attr("string"),

  project: DS.attr('string'),
  is_addressy: DS.attr('boolean'),
  non_addressy_location: DS.attr('string'),
  source_type: DS.attr('string'),
  is_tdi_influenced: DS.attr('boolean'),
  investment_type: DS.attr('string'),
  product_massdev: DS.attr('string'),
  product_public: DS.attr('string'),
  product_private: DS.attr('string'),
  is_amount_known: DS.attr('boolean'),
  is_amount_estimated: DS.attr('boolean'),
  is_amount_public: DS.attr('boolean'),
  amount_exact: DS.attr('number'),
  amount_estimated: DS.attr('string'),
  investment_status: DS.attr(),
  is_close_date_approx: DS.attr('boolean'),
  featured_photo: DS.attr('string'),
  pub_docs: DS.attr('string'),
  priv_docs: DS.attr('string'),
  related_link_title: DS.attr('string'),
  related_link_url: DS.attr('string'),
  relation_notes: DS.attr('string'),
  priv_contact_name: DS.attr('string'),
  priv_contact_organization: DS.attr('string'),
  priv_contact_role: DS.attr('string'),
  priv_contact_phone: DS.attr('string'),
  priv_contact_email: DS.attr('string'),
  priv_contact_website: DS.attr('string'),
  priv_notes: DS.attr('string'),
  pub_notes: DS.attr('string'),
  cta_text: DS.attr('string'),
  cta_contact: DS.attr('string'),
  pub_contact_1: DS.attr('string'),
  pub_contact_org_1: DS.attr('string'),
  pub_contact_role_1: DS.attr('string'),
  pub_contact_phone_1: DS.attr('string'),
  pub_contact_email_1: DS.attr('string'),
  pub_contact_website_1: DS.attr('string'),
  pub_contact_2: DS.attr('string'),
  pub_contact_org_2: DS.attr('string'),
  pub_contact_role_2: DS.attr('string'),
  pub_contact_phone_2: DS.attr('string'),
  pub_contact_email_2: DS.attr('string'),
  pub_contact_website_2: DS.attr('string'),

  city: DS.belongsTo("city"),
  isSelected: false
});

export const INVESTMENT_PARAMS = ['investmentTypes', 'valueMin', 'valueMax'];
export const INVESTMENT_TYPES  = ['MassDev Direct','State Direct (non-MassDev)','Other Public Agency','Private','Public-Private'];
export const INVESTMENT_FILTERS_CONFIG = [
      { 
        property: 'type',
        filter: 'investmentTypesArray',
        filterType: 'isAny'
      },
      { 
        property: 'value',
        filter: ['valueMin', 'valueMax'],
        filterType: 'isWithin'
      }
    ];
