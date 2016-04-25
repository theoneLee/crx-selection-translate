/**
 * @files 读取远程服务器上的数据并显示通知
 */

const THIS_IS_FROM_SERVER = {
    options: {
        type: 'basic',
        iconUrl: 'logo.png'
    },
    url: 'http://www.baidu.com',
    id: '234'
};


if (localStorage.lastNID !== THIS_IS_FROM_SERVER.id) {
    localStorage.lastNID = THIS_IS_FROM_SERVER.id;
    chrome.notifications.create(THIS_IS_FROM_SERVER.id, THIS_IS_FROM_SERVER.options);
    chrome.notifications.onClicked.addListener((nid)=> {
        if (nid === THIS_IS_FROM_SERVER.id) {
            chrome.tabs.create({
                url: THIS_IS_FROM_SERVER.url
            });
        }
    });
}
