  const animatedScroll = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if(entry.isIntersecting){
                entry.target.classList.add('enter');
                animatedScroll.unobserve(entry.target);
            }
        });
    }
  );

  export default{
      bind(el){
          el.classList.add('before-enter');
          animatedScroll.observe(el)
      }
  }