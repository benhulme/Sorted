box = 'scotch/box'
host = 'sorted'
ip = '192.168.33.10'
domain = 'local'

Vagrant.configure('2') do |config|

 config.vm.box = box

 config.hostmanager.enabled = true
 config.hostmanager.manage_host = true
	
 config.vm.box_version = "2.5.0" 
 config.vm.define host do |node|
   node.vm.box = box
   node.vm.host_name = host + '.' + domain
   node.vm.network :private_network, ip: ip
   node.vm.synced_folder './sorted', '/var/www/public', :mount_options => ['dmode=777', 'fmode=666']
 end    

end