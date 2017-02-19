export default function(){
  this.transition(
    this.fromRoute('cities.city.city-filters'),
    this.use('toLeft'),
    this.reverse('toRight')
  )
};