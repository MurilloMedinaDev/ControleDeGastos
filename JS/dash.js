function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('ativa');
  }

  const config = {
    type: 'pie',
    data: dadosDoGrafico,
    options: {
      responsive: true,
      maintainAspectRatio: false, // permite redimensionar o canvas
    },
  };
  
  const ctx = document.getElementById('graficoPizza').getContext('2d');
  new Chart(ctx, config);
  