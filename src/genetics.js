const geneSorter = function (g1, g2) {
  return g1 - g2
}

const Genetics = function ({ numGenes, gene, mutationRate, mutate, cross, evaluate }) {
  let iteration_ = 0
  let genes_ = (new Array(numGenes)).fill(null).map(function () {
    const value = gene()
    return { value, score: evaluate(value) }
  }).sort(geneSorter)

  return {
    iterate() {
      genes_ = genes_.concat(genes_.map(function (gene, i) {
        if (Math.random() < mutationRate) {
          const value = mutate(gene.value)
          return { value, score: evaluate(value) }
        } else {
          const j = Math.floor(Math.random() * numGenes)
          const value = cross(gene.value, genes[j].value)
          return { value, score: evaluate(value) }
        }
      })).sort(geneSorter).slice(0, numGenes)
    },
    iteration() {
      return iteration_
    },
    bestGene() {
      return genes_[0].value
    },
    bestScore() {
      return genes_[0].score
    }
  }
}

export default Genetics
