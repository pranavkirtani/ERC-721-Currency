
const NFT = artifacts.require('./NFTCurrency.sol')
require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('MyNFT', (accounts) => {
  let nft

  before(async () => {
    nft=await NFT.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = nft.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await nft.name()
      assert.equal(name, 'NFT')
    })

    it('has a symbol', async () => {
      const symbol = await nft.symbol()
      assert.equal(symbol, 'nft')
    })

  })

  describe('minting', async () => {

    it('creates a new token', async () => {
        //console.log("contract",contract)
      const result = await nft.IssueToken('0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1',10)

      const totalSupply = await nft.balanceOf("0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1")
      console.log("totalSupply",totalSupply)

      const denominationBalance=await nft.returnBalance("0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1",10)
      
      const netWorth=await nft.netWorth("0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1")
      
      // SUCCESS
      console.log("denominationBalance",denominationBalance)
      assert.equal(totalSupply, 1)
      assert.equal(denominationBalance,1)
      assert.equal(netWorth,10)
       console.log("netWorth",netWorth)


      const result2 = await nft.IssueToken('0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1',10)

      const totalSupply2 = await nft.balanceOf("0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1")
      console.log("totalSupply 2=",totalSupply2)
      const denominationBalance2=await nft.returnBalance("0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1",10)
      const netWorth2=await nft.netWorth("0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1")
      // SUCCESS
      assert.equal(totalSupply2, 2)
      assert.equal(denominationBalance2,2)
      console.log("netWorth2",netWorth2)
      assert.equal(netWorth2,20)

      const result3 = await nft.IssueToken('0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1',20)
      const totalSupply3 = await nft.balanceOf("0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1")
      const denominationBalance3=await nft.returnBalance("0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1",20)
      const netWorth4=await nft.netWorth("0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1")
      await nft.IssueToken('0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1',10)
      const denominationBalance4=await nft.returnBalance("0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1",10)
      const netWorth3=await nft.netWorth("0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1")
      // SUCCESS
      console.log("denominationBalance3",denominationBalance3)
      console.log("denominationBalance4",denominationBalance4)
      console.log("netWorth3",netWorth3)
       console.log("netWorth4",netWorth4)
      assert.equal(totalSupply3, 3)
      assert.equal(denominationBalance3,1)
      assert.equal(denominationBalance4,3)
      assert.equal(netWorth3,50)
      assert.equal(netWorth4,40)
      const map=await nft.returnOwnerMap("0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1",10)
      console.log("owner map",map)
       const event = result.logs[0].args
      assert.equal(event.tokenId.toNumber(), 1, 'id is correct')
      const uri=await nft.tokenURI(map)
      console.log("uri",uri)
      
      //transfer to another user
      await nft.transferFunds("0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1","0xcE2f77ad4B9959075cCaDC7971d0475610848953",10)
      console.log("transfer was done......")
      const netWorth_old=await nft.netWorth("0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1")
      const netWorth_new=await nft.netWorth("0xcE2f77ad4B9959075cCaDC7971d0475610848953")
      assert.equal(netWorth_old,40)
      assert.equal(netWorth_new,10)
      const denominationBalance_old=await nft.returnBalance("0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1",10)
      const denominationBalance_new=await nft.returnBalance("0xcE2f77ad4B9959075cCaDC7971d0475610848953",10)
     assert.equal(denominationBalance_old,2)
      assert.equal(denominationBalance_new,1)


   //transfer same amount again
      await nft.transferFunds("0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1","0xcE2f77ad4B9959075cCaDC7971d0475610848953",10)
      console.log("transfer was done......")
      const netWorth_old_2=await nft.netWorth("0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1")
      const netWorth_new_2=await nft.netWorth("0xcE2f77ad4B9959075cCaDC7971d0475610848953")
      assert.equal(netWorth_old_2,30)
      assert.equal(netWorth_new_2,20)
      const denominationBalance_old_2=await nft.returnBalance("0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1",10)
      const denominationBalance_new_2=await nft.returnBalance("0xcE2f77ad4B9959075cCaDC7971d0475610848953",10)
     assert.equal(denominationBalance_old_2,1)
      assert.equal(denominationBalance_new_2,2)


       //transfer different amount 
      await nft.transferFunds("0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1","0xcE2f77ad4B9959075cCaDC7971d0475610848953",20)
      console.log("transfer was done......")
      const netWorth_old_3=await nft.netWorth("0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1")
      const netWorth_new_3=await nft.netWorth("0xcE2f77ad4B9959075cCaDC7971d0475610848953")
      assert.equal(netWorth_old_3,10)
      assert.equal(netWorth_new_3,40)
      const denominationBalance_old_3=await nft.returnBalance("0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1",10)
      const denominationBalance_new_3=await nft.returnBalance("0xcE2f77ad4B9959075cCaDC7971d0475610848953",10)
     assert.equal(denominationBalance_old_3,1)
      assert.equal(denominationBalance_new_3,2)

      //transfer same  amount to make 0
      await nft.transferFunds("0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1","0xcE2f77ad4B9959075cCaDC7971d0475610848953",10)
      console.log("transfer was done......")
      const netWorth_old_4=await nft.netWorth("0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1")
      const netWorth_new_4=await nft.netWorth("0xcE2f77ad4B9959075cCaDC7971d0475610848953")
      assert.equal(netWorth_old_4,0)
      assert.equal(netWorth_new_4,50)
      const denominationBalance_old_4=await nft.returnBalance("0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1",10)
      const denominationBalance_new_4=await nft.returnBalance("0xcE2f77ad4B9959075cCaDC7971d0475610848953",10)
     assert.equal(denominationBalance_old_4,0)
      assert.equal(denominationBalance_new_4,3)



      //transfer some money back

       const map2=await nft.returnOwnerMap("0xcE2f77ad4B9959075cCaDC7971d0475610848953",10)
      console.log("owner map",map2)
      const uri2=await nft.tokenURI(map2)
      console.log("uri",uri2)
      await nft.transferFunds("0xcE2f77ad4B9959075cCaDC7971d0475610848953","0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1",10)
      console.log("transfer was done......")
      const netWorth_old_6=await nft.netWorth("0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1")
      const netWorth_new_6=await nft.netWorth("0xcE2f77ad4B9959075cCaDC7971d0475610848953")
      assert.equal(netWorth_old_6,10)
      assert.equal(netWorth_new_6,40)
      const denominationBalance_old_6=await nft.returnBalance("0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1",10)
      const denominationBalance_new_6=await nft.returnBalance("0xcE2f77ad4B9959075cCaDC7971d0475610848953",10)
     assert.equal(denominationBalance_old_6,1)
      assert.equal(denominationBalance_new_6,2)

       await nft.transferFunds("0xcE2f77ad4B9959075cCaDC7971d0475610848953","0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1",10)
      console.log("transfer was done......")
      const netWorth_old_7=await nft.netWorth("0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1")
      const netWorth_new_7=await nft.netWorth("0xcE2f77ad4B9959075cCaDC7971d0475610848953")
      assert.equal(netWorth_old_7,20)
      assert.equal(netWorth_new_7,30)
      const denominationBalance_old_7=await nft.returnBalance("0x3E9522bE21f44eEb3C88eb8DA3F1edf799f00dA1",10)
      const denominationBalance_new_7=await nft.returnBalance("0xcE2f77ad4B9959075cCaDC7971d0475610848953",10)
     assert.equal(denominationBalance_old_7,2)
      assert.equal(denominationBalance_new_7,1)

    })
  })



})