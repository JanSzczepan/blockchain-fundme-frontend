import { Maybe } from '@metamask/providers/dist/utils'
import Info from './Info'
import { ethers } from 'ethers'
import { abi, contractAddress } from './constants'

class FundMe {
   connectButtonElement: HTMLButtonElement
   fundButtonElement: HTMLButtonElement
   withdrawButtonElement: HTMLButtonElement
   balanceButtonElement: HTMLButtonElement
   infoContainerElement: HTMLDivElement
   fundInputElement: HTMLInputElement
   isEthereum: boolean
   accounts: Maybe<string[]>
   provider: ethers.providers.Web3Provider
   contract: ethers.Contract

   constructor() {
      this.init()
   }

   private async connect() {
      if (this.isEthereum) {
         try {
            await window.ethereum?.request({ method: 'eth_requestAccounts' })
         } catch (error) {
            this.addInfo(`Error occured while connecting! Please try again`)
            console.error(error)
            return
         }

         this.addConnectedInfo()
      } else {
         this.addInfo('Please install Metamask!')
      }
   }

   private async checkConnection() {
      this.accounts = await window.ethereum?.request({
         method: 'eth_accounts',
      })

      if (this.accounts?.length && this.accounts?.length > 0) {
         this.addConnectedInfo()
      }
   }

   private addConnectedInfo() {
      this.connectButtonElement.innerText = 'Connected'
      this.addInfo('Connected with Metamask')
      this.connectButtonElement.disabled = true
   }

   private async fund() {
      const ethAmount = this.fundInputElement.value

      if (this.isEthereum) {
         if (!ethAmount) {
            this.addInfo('Please enter ETH value!')
            return
         }

         this.addInfo(`Funding with ${ethAmount} ETH...`)

         try {
            const transactionResponse: ethers.providers.TransactionResponse =
               await this.contract.fund({
                  value: ethers.utils.parseEther(ethAmount),
               })
            await transactionResponse.wait(1)
         } catch (error) {
            this.addInfo(`Error occured while funding! Please try again`)
            console.error(error)
            return
         }

         this.fundInputElement.value = '0'
         this.addInfo(`Funded ${ethAmount} ETH! Thank you!`)
      } else {
         this.addInfo('Please install Metamask!')
      }
   }

   private async withdraw() {
      if (this.isEthereum) {
         this.addInfo(`Withdrawing...`)

         try {
            const transactionResponse: ethers.providers.TransactionResponse =
               await this.contract.withdraw()
            const transactionReceipt = await transactionResponse.wait(1)
         } catch (error) {
            this.addInfo(`Error occured while withdrawing! Please try again`)
            console.error(error)
            return
         }

         this.addInfo(`Withdrawn ETH successfully!`)
      } else {
         this.addInfo('Please install Metamask!')
      }
   }

   private async getBalance() {
      if (this.isEthereum) {
         try {
            const balance = await this.provider.getBalance(
               this.contract.address
            )
            const formatedBalance = ethers.utils.formatEther(balance)
            this.addInfo(`Current contract balance: ${formatedBalance} ETH`)
         } catch (error) {
            this.addInfo(
               `Error occured while getting balance! Please try again`
            )
            console.error(error)
            return
         }
      } else {
         this.addInfo('Please install Metamask!')
      }
   }

   private addInfo(text: string) {
      const count = this.infoContainerElement.childElementCount + 1
      const infoDiv = new Info(`${count}. ${text}`)
      this.infoContainerElement.prepend(infoDiv.infoElement)
   }

   private getWeb3Info() {
      this.isEthereum = typeof window.ethereum !== 'undefined'
      this.provider = new ethers.providers.Web3Provider(window.ethereum as any)
      const signer = this.provider.getSigner()
      this.contract = new ethers.Contract(contractAddress, abi, signer)
   }

   private findElements() {
      this.connectButtonElement = document.querySelector('#connect')!
      this.fundButtonElement = document.querySelector('#fund')!
      this.withdrawButtonElement = document.querySelector('#withdraw')!
      this.balanceButtonElement = document.querySelector('#balance')!
      this.infoContainerElement = document.querySelector('#info-container')!
      this.fundInputElement = document.querySelector('#inputFund')!
   }

   private bindEvents() {
      this.connectButtonElement.addEventListener(
         'click',
         this.connect.bind(this)
      )
      this.fundButtonElement.addEventListener('click', this.fund.bind(this))
      this.withdrawButtonElement.addEventListener(
         'click',
         this.withdraw.bind(this)
      )
      this.balanceButtonElement.addEventListener(
         'click',
         this.getBalance.bind(this)
      )
   }

   private init() {
      this.getWeb3Info()
      this.findElements()
      this.bindEvents()
      this.checkConnection()
   }
}

export default FundMe
