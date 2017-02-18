export default function(){
  this.transition(
    this.fromRoute('cities.city.index'),
    this.toRoute('cities.city.features'),
    this.use('toRight'),
    this.reverse('toLeft')
  )
};