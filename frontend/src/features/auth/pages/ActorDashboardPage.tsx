import { useState } from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { ArrowUpRight, LayoutDashboard, LogOut, Menu, FolderOpen, ChevronRight, ShieldCheck, X } from 'lucide-react';
import { roles, readUser } from '../roles';
import '../workspace.css';

export function ActorDashboardPage() {
 const user=readUser(); const [params]=useSearchParams(); const [menu,setMenu]=useState(false); const [logout,setLogout]=useState(false);
 if(!user) return <Navigate to="/login" replace/>;
 const role=roles[user.role]; const page=params.get('page'); const feature=role.features.find(f=>f[0]===page);
 if(page && !feature) return <Navigate to="/forbidden-403" replace/>;
 return <div className="workspace">
 <aside className={menu?'workspace-nav open':'workspace-nav'}>
 <Link className="workspace-brand" to="/app"><img src="/images/logo-fivegates.svg" alt=""/>EquiFlow<span>HORSE CLUB</span></Link>
 <div className="role-badge"><ShieldCheck size={18}/><div>{role.name}<small>Personal workspace</small></div></div>
 <p className="nav-label">WORKSPACE</p>
 <nav aria-label="Workspace navigation"><Link className={!page?'selected':''} to="/app" onClick={()=>setMenu(false)}><LayoutDashboard size={18}/>Overview</Link>
 {role.features.map(([name],i)=><Link className={page===name?'selected':''} key={name} to={'/app?page='+encodeURIComponent(name)} onClick={()=>setMenu(false)}><span className="nav-number">{String(i+1).padStart(2,'0')}</span>{name}</Link>)}</nav>
 <div className="nav-bottom"><small>EquiFlow / Local preview</small><button onClick={()=>setLogout(true)}><LogOut size={17}/> Sign out</button></div>
 </aside>
 <div className="workspace-main"><header className="workspace-top"><button className="menu-toggle" aria-label="Toggle navigation" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button><span>Workspace <ChevronRight size={14}/> {feature?feature[0]:'Overview'}</span><div className="user-chip"><span>{role.name.split(' ').map(s=>s[0]).slice(0,2).join('')}</span><div>{role.name}<small>{user.email}</small></div></div></header>
 <main className="workspace-content"><p className="workspace-eyebrow">{role.name.toUpperCase()} WORKSPACE</p><h1>{feature?feature[0]:role.title}</h1><p className="workspace-description">{feature?feature[1]:role.description}</p>
 {!feature?<><section className="workspace-banner"><div><span>ONE CLUB. FIVE ROLES.</span><h2>Good care starts<br/>with a clear view.</h2><p>Your tools, organized around your responsibilities.</p></div><img src="/images/equine-editorial.webp" alt="Horse at the club"/></section><div className="section-heading"><h2>Your workspace</h2><span>{role.features.length} areas</span></div><div className="feature-grid">{role.features.map(([name,description],i)=><Link key={name} to={'/app?page='+encodeURIComponent(name)} className="feature-card"><div><span className="feature-index">{String(i+1).padStart(2,'0')}</span><ArrowUpRight size={20}/></div><h3>{name}</h3><p>{description}</p><span className="feature-action">Open workspace <ChevronRight size={14}/></span></Link>)}</div></>:
 feature[0]==='Staff accounts'?<section className="workspace-table"><h2>Local demo accounts</h2><p>Shared demo password: <code>equi123</code></p><div className="table-scroll"><table><thead><tr><th>Actor</th><th>Email</th><th>Status</th></tr></thead><tbody>{Object.values(roles).map(r=><tr key={r.email}><td>{r.name}</td><td>{r.email}</td><td><span className="active-pill">Demo account</span></td></tr>)}</tbody></table></div></section>:
 feature[0]==='Access permissions'?<section className="workspace-table"><h2>Role responsibilities</h2>{Object.values(roles).map(r=><div className="permission-row" key={r.name}><h3>{r.name}</h3><p>{r.features.map(f=>f[0]).join(' · ')}</p></div>)}<p>Preview of role navigation. Server authorization is not implemented by this screen.</p></section>:
 <section className="workspace-empty"><FolderOpen size={42} strokeWidth={1.2}/><h2>No records yet</h2><p>{feature[1]}</p><p>This base screen is ready for future data integration. No business records have been added.</p><Link to="/app">Back to overview <ArrowUpRight size={16}/></Link></section>}
 <footer className="workspace-footer">EquiFlow · Horse Training & Racing Club <span>Local preview</span></footer></main></div>
 {logout&&<div className="dialog-backdrop"><section role="dialog" aria-modal="true" aria-labelledby="logout-title" className="logout-dialog"><h2 id="logout-title">Sign out of EquiFlow?</h2><p>You can sign in again with any demo account.</p><div><button autoFocus onClick={()=>setLogout(false)}>Stay signed in</button><button onClick={()=>{localStorage.removeItem('equiflow:user');window.location.assign('/login')}}>Sign out</button></div></section></div>}
 </div>;
}
