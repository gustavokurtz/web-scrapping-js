import puppeteer from 'puppeteer';
import readlineSync from 'readline-sync';

console.log('Bem vindo ao bot conversor de moedas! 🤖')

async function bot(){
    const browser = await puppeteer.launch( { headless: true } );
    const page = await browser.newPage();
    const moedaBase =  readlineSync.question('Informe uma moeda base: ') || 'dolar';    
    const moedaFinal = readlineSync.question('Informe uma moeda desejada: ') || 'real';
    const urlDolarEReal = `https://www.google.com/search?q=${moedaBase}+para+${moedaFinal}&oq=${moedaBase}+para+${moedaFinal}&gs_lcrp=EgZjaHJvbWUyDwgAEEUYORiDARixAxiABDIHCAEQABiABDIHCAIQABiABDIHCAMQABiABDIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIHCAcQABiABDIHCAgQABiABDIHCAkQABiABNIBCDIwOTlqMWo3qAIAsAIA&sourceid=chrome&ie=UTF-8`
    await page.goto(urlDolarEReal);

    const valorConvertido = await page.evaluate(() => {
        return document.querySelector('.lWzCpb.a61j6').value;
    })
    
    console.log(`O valor de 1 ${moedaBase} em ${moedaFinal} é ${valorConvertido} `)
    await browser.close()
}

bot()